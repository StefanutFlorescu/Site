document.addEventListener('DOMContentLoaded', function() {
    const orarButton = document.getElementById('orarButton');
    const orarContainer = document.getElementById('orar-container');
    const closeOrarButton = document.getElementById('close-orar');
    const statusSpan = document.getElementById('status');

    // Funcție pentru a verifica dacă firma este deschisă
    function checkIfOpen() {
        const now = new Date();
        const day = now.getDay(); 
        const hour = now.getHours();

        // Orar de deschidere
        const hours = [
            [0, 0, 0],   // Duminică
            [1, 9, 18],  // Luni
            [2, 9, 18],  // Marți
            [3, 9, 18],  // Miercuri
            [4, 9, 18],  // Joi
            [5, 9, 18],  // Vineri
            [6, 10, 16]  // Sâmbătă
        ];

        const openHour = hours[day][1];
        const closeHour = hours[day][2];

        // Verificăm dacă ora curentă este între orele de deschidere și închidere
        if (hour >= openHour && hour < closeHour) {
            statusSpan.textContent = 'deschisă';
            statusSpan.style.color = 'green';
        } else {
            statusSpan.textContent = 'închisă';
            statusSpan.style.color = 'red';
        }
    }

    // Afișează orarul la click pe butonul de orar
    orarButton.addEventListener('click', function() {
        orarContainer.style.display = 'block';
        checkIfOpen(); // Verifică dacă firma este deschisă
        setTimeout(function() {
            orarContainer.style.display = 'none'; // Dispare după 10 secunde
        }, 1000);
    });

    // Închide orarul la click pe butonul de închidere
    closeOrarButton.addEventListener('click', function() {
        orarContainer.style.display = 'none';
    });
});
