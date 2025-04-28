window.onload = function() {
    let btn = document.getElementById("filtrare");
    btn.onclick = function() {
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
        let produse = document.getElementsByClassName("produs");

        let vectRadio = document.getElementsByName("gr_rad");
        let inpCalorii = null;
        let mincalorii = null;
        let maxcalorii = null;
        for (let rad of vectRadio) {
            if (rad.checked) {
                inpCalorii = rad.value;
                if (inpCalorii != "toate") {
                    [mincalorii, maxcalorii] = inpCalorii.split(":");
                    mincalorii = parseInt(mincalorii);
                    maxcalorii = parseInt(maxcalorii);
                }
                break;
            }
        }

        let inpPret = parseFloat(document.getElementById("inp-pret").value.trim());
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase();

        for (let prod of produse) { 
            prod.style.display = "none";
            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = nume.startsWith(inpNume);

            let calorii = parseInt(prod.getElementsByClassName("val-calorii")[0].innerHTML.trim());
            let cond2 = (inpCalorii == "toate") || (mincalorii <= calorii && calorii < maxcalorii);

            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let cond3 = (isNaN(inpPret) || inpPret <= pret);

            let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond4 = (inpCategorie=='toate' || inpCategorie==categorie);


            if (cond1 && cond2 && cond3 && cond4) {
                prod.style.display = "block";
            }
        }
    }



    let btnSortCresc = document.getElementById("sortCrescNume");
    let btnSortDescresc = document.getElementById("sortDescrescNume");

    btnSortCresc.onclick = function() {
        sorteazaProduse(1);
    }

    btnSortDescresc.onclick = function() {
        sorteazaProduse(-1); 
    }

    function sorteazaProduse(sens) {
        let produse = Array.from(document.getElementsByClassName("produs"));
        let container = produse[0]?.parentElement; 

        produse.sort(function(a, b) {
            let pretA = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let pretB = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML.trim());

            if (pretA != pretB) {
                return sens * (pretA - pretB);
            } else {
                let valoriA = a.getElementsByClassName("val-caracteristica")[0]?.innerHTML.trim().split(",").length || 0;
                let valoriB = b.getElementsByClassName("val-caracteristica")[0]?.innerHTML.trim().split(",").length || 0;
                return sens * (valoriA - valoriB);
            }
        });

        for (let prod of produse) {
            container.appendChild(prod);
        }
    }




    let btnCalculeaza = document.getElementById("btn-calculeaza");

    function calculeazaSuma() {
        let checkboxes = document.getElementsByClassName("select-cos");
        let produse = document.getElementsByClassName("produs");

        let suma = 0;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                let pret = parseFloat(produse[i].getElementsByClassName("val-pret")[0].innerHTML.trim());
                suma += pret;
            }
        }

        // Creare div rezultat
        let divRezultat = document.createElement("div");
        divRezultat.style.position = "fixed";
        divRezultat.style.bottom = "10px";
        divRezultat.style.right = "10px";
        divRezultat.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        divRezultat.style.color = "white";
        divRezultat.style.padding = "10px";
        divRezultat.style.borderRadius = "8px";
        divRezultat.style.zIndex = "1000";
        divRezultat.innerHTML = "Suma prețurilor selectate: " + suma.toFixed(2) + " lei";

        document.body.appendChild(divRezultat);

        // Stergem dupa 2 secunde
        setTimeout(function() {
            divRezultat.remove();
        }, 2000);
    }

    btnCalculeaza.onclick = calculeazaSuma;

    document.addEventListener("keydown", function(event) {
        if (event.altKey && event.code === "KeyC") {
            event.preventDefault(); 
            calculeazaSuma();
        }
    });
    

    let btnResetare = document.getElementById("resetare");
    btnResetare.onclick = function() {
        if (confirm("Sigur vrei să resetezi filtrele?")) {
            // Resetare inputuri
            document.getElementById("inp-nume").value = "";
            document.getElementById("inp-pret").value = "";
            document.getElementById("inp-categorie").value = "toate"; // sau ""
    
            // Resetare radio buttons
            let vectRadio = document.getElementsByName("gr_rad");
            for (let rad of vectRadio) {
                rad.checked = false;
            }
    
            // Afișare toate produsele
            let produse = document.getElementsByClassName("produs");
            for (let prod of produse) {
                prod.style.display = "block";
            }
        }
    };
    
}
