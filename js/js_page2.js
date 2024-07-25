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

//Filtre 
const products = [
    { name: 'Gommage à l\'abricot', category: 'body-scrub', image: 'gommage_abricot.png', price: '7€', description: 'Gommage à l\'abricot : un exfoliant doux pour un teint lumineux et radieux.' },
    { name: 'Gommage au chocolat', category: 'body-scrub', image: 'gommage_chocolat.png', price: '7€', description: 'Gommage au chocolat : un traitement indulgent pour une peau douce et revitalisée.' },
    { name: 'Gommage au citron', category: 'body-scrub', image: 'gommage_citron.png', price: '7€', description: 'Gommage au citron : un exfoliant rafraîchissant pour une peau éclatante et purifiée.' },
    { name: 'Gommage à la papaye', category: 'body-scrub', image: 'gommage_papaye.png', price: '7€', description: 'Gommage à la papaye : un soin exfoliant naturel pour une peau lisse et nourrie.' },
    { name: 'Gommage à la rose', category: 'body-scrub', image: 'gommage_rose.png', price: '7€', description: 'Gommage à la rose : un exfoliant délicat pour un éclat naturel et une peau soyeuse.' },
    { name: 'Crème hydratante', category: 'hair-care', image: 'creme_hydratante.jpeg', price: '10€', description: 'Crème hydratante : un soin capillaire intensément nourrissant pour des cheveux doux et brillants.' },
    { name: 'Définisseur de boucles', category: 'hair-care', image: 'definisseur_boucle.jpg', price: '10€', description: 'Définisseur de boucles : un produit coiffant pour des boucles parfaitement définies.' },
    { name: 'Masque 3 beurres', category: 'hair-care', image: 'masque_3beurres.jpg', price: '10€', description: 'Masque 3 beurres : un traitement riche et réparateur pour des cheveux nourris en profondeur.' },
    { name: 'Huile de anti-ride', category: 'face-care', image: 'huile_ride.jpg', price: '10€', description: 'Huile de anti-ride : un sérum anti-âge pour réduire l\'apparence des rides et raffermir la peau' },
    { name: 'Savon au curcuma', category: 'face-care', image: 'savon_curcuma.png', price: '5€', description: 'Savon au curcuma : un savon éclaircissant pour un teint lumineux et uniformisé.' },
    { name: 'Savon Nila', category: 'face-care', image: 'savon_nila.jpeg', price: '5€', description: 'Savon Nila : un savon purifiant pour une peau nettoyée en profondeur et éclatante.' },
    { name: 'Savon noir', category: 'face-care', image: 'savon_noir.png', price: '5€', description: 'Savon noir : un savon exfoliant traditionnel pour un teint purifié et revitalisé.' },
    { name: 'Gel douche au savon noir', category: 'body-care', image: 'gel_douche_savon_noir.jpg', price: '5€', description: 'Gel douche au savon noir : un gel douche doux pour une peau propre et rafraîchie.' },
    { name: 'Gel douche marocain', category: 'body-care', image: 'gel_douche_maroc.jpg', price: '5€', description: 'Gel douche marocain : un gel douche enrichi pour une expérience de lavage luxueuse.' },
    { name: 'Huile de bronzage', category: 'body-care', image: 'huile_bronzage.jpg', price: '10€', description: 'Huile de bronzage : une huile légère pour un bronzage uniforme et une peau éclatante.' }
];

function displayProducts(productsToDisplay) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-lg-3 col-md-3 col-sm-4 col-6 col-product'; 
        productElement.dataset.category = product.category;
        productElement.innerHTML = `
            <div class="product">
                <img src="../img/page2/${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <p class="product-price"><strong>${product.price}</strong></p>
                <p class="product-description">${product.description}</p>
                <button class="btn btn-primary mt-2">Ajouter au panier</button>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

function filterCategory(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    displayProducts(filteredProducts);
});

// Initial display of products
displayProducts(products);