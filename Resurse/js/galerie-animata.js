window.addEventListener("load", function() {
    const galerie = document.getElementById("galerie-animata");
    const imagini = galerie.querySelectorAll("img");

    let index = 0;
    imagini[index].classList.add("active");  
    
    setInterval(() => {
        imagini[index].classList.remove("active"); 
        
        
        imagini[index].style.transform = "scaleY(0) rotate(360deg)";
        
        index = (index + 1) % imagini.length;  

        imagini[index].classList.add("active");  
        imagini[index].style.transform = "scaleY(1) rotate(0deg)";  
    }, 3000);  
});
