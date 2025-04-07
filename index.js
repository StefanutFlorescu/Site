const express= require("express");
const path= require("path");
const fs = require("fs");


app= express();


console.log("Folderul proiectului: ", __dirname)
console.log("Calea fisierului index.js: ", __filename)
console.log("Folderul curent de lucru: ", process.cwd())

app.set("view engine", "ejs");

obGlobal={
    obErori:null
}


function initErori(){
    let continut = fs.readFileSync(path.join(__dirname,"resurse/json/erori.json")).toString("utf-8");
    console.log(continut)
    obGlobal.obErori=JSON.parse(continut)
    console.log(obGlobal.obErori)
    
    obGlobal.obErori.eroare_default.imagine=path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine)
    for (let eroare of obGlobal.obErori.info_erori){
        eroare.imagine=path.join(obGlobal.obErori.cale_baza, eroare.imagine)
    }
    console.log(obGlobal.obErori)

}

initErori()

function afisareEroare(res, identificator, titlu, text, imagine){
    let eroare= obGlobal.obErori.info_erori.find(function(elem){ 
                        return elem.identificator==identificator
                    });
    if(eroare){
        if(eroare.status)
            res.status(identificator)
        var titluCustom=titlu || eroare.titlu;
        var textCustom=text || eroare.text;
        var imagineCustom=imagine || eroare.imagine;


    }
    else{
        var err=obGlobal.obErori.eroare_default
        var titluCustom=titlu || err.titlu;
        var textCustom=text || err.text;
        var imagineCustom=imagine || err.imagine;


    }
    res.render("pagini/eroare", { //transmit obiectul locals
        titlu: titluCustom,
        text: textCustom,
        imagine: imagineCustom
})

}



app.use("/resurse", express.static(path.join(__dirname,"resurse")))

app.get(["/","/index","/home"], function(req, res){
    res.render("pagini/index", {ip : req.ip});
})

app.get("/despre", function(req, res){
    res.render("pagini/despre");
})

app.get("/index/a", function(req, res){
    res.render("pagini/index");
})


app.get("/cerere", function(req, res){
    res.send("<p style='color:blue'>Buna ziua</p>")
})


app.get("/fisier", function(req, res, next){
    res.sendfile(path.join(__dirname,"package.json"));
})


app.get("/abc", function(req, res, next){
    res.write("Data curenta: ")
    next()
})

app.get("/abc", function(req, res, next){
    res.write((new Date())+"")
    res.end()
    next()
})


app.get("/abc", function(req, res, next){
    console.log("------------")
})

app.get("/*.ejs", function(req, res, next){
    afisareEroare(res, 400)
})

app.get("/resurse/*", function(req, res, next){
    afisareEroare(res, 403)
})

app.get("/favicon.ico", function(req, res, next){
    res.sendfile(path.join(__dirname, "resurse/imagini/favicon/favicon.ico"))
})


app.get("/*", function(req, res, next){
    try{
        res.render("pagini"+req.url, function(err, rezultatRandare){
            if(err){
                console.log(err)
                if(err.message.startsWith("Failed to lookup view")){
                    afisareEroare(res, 404)
                }
            }
            else{
                afisareEroare(res)
            }
        });
    }
    catch(errRandare){
        if(err){
            console.log(err)
            if(err.message.startsWith("Cannot find module")){
                afisareEroare(res, 404)
            }
        }
        else{
            afisareEroare(res)
        }
    }
})

const vect_foldere = ["temp"];

vect_foldere.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Folder created: ${folderPath}`);
    } else {
        console.log(`Folder already exists: ${folderPath}`);
    }
});


app.listen(8080);
console.log("Serverul a pornit")


