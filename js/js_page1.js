//Nav barre

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


