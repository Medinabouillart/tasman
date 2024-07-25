document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-link');

    // Fonction pour activer un lien
    function activateLink(link) {
        // Enlève la classe 'active' de tous les liens
        navLinks.forEach(function(l) {
            l.classList.remove('active');
        });
        // Ajoute la classe 'active' au lien passé en paramètre
        link.classList.add('active');
        // Stocke l'URL du lien actif dans le localStorage
        localStorage.setItem('activeLink', link.href);
    }

    // Initialiser l'état actif à partir du localStorage
    var activeLink = localStorage.getItem('activeLink');
    if (activeLink) {
        navLinks.forEach(function(link) {
            if (link.href === activeLink) {
                activateLink(link);
            }
        });
    }

    // Ajouter un événement de clic à chaque lien
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Empêcher le comportement par défaut
            e.preventDefault();
            // Activer le lien cliqué
            activateLink(this);
            // Rediriger vers la page demandée après un court délai
            setTimeout(() => {
                window.location.href = this.href;
            }); 
        });
    });
});

//Calendrier 
document.addEventListener('DOMContentLoaded', () => {
    const daysContainer = document.querySelector('.days');
    const monthYear = document.querySelector('.header h1');
    const modal = document.getElementById('appointment-modal');
    const closeModal = document.querySelector('.modal .close');
    const appointmentDetails = document.getElementById('appointment-details');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        daysContainer.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += '<div class="day-cell"></div>';
        }

        for (let day = 1; day <= lastDate; day++) {
            daysContainer.innerHTML += `
                <div class="day-cell">
                    <span>${day}</span>
                </div>`;
        }

        monthYear.textContent = `${getMonthName(month)} ${year}`;
    }

    function getMonthName(monthIndex) {
        return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][monthIndex];
    }

    document.querySelector('.header .prev').addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    document.querySelector('.header .next').addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    daysContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('day-cell')) {
            appointmentDetails.textContent = `Détails pour le ${e.target.querySelector('span').textContent}`;
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    renderCalendar(currentMonth, currentYear);
});