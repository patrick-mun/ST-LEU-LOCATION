document.addEventListener("DOMContentLoaded", function () {
    // Initialisation du header et du footer
    function includeHTML() {
        const header = document.getElementById("header");
        const footer = document.getElementById("footer");

        if (header) {
            fetch("HTML/header.html")
                .then(response => response.text())
                .then(data => header.innerHTML = data)
                .catch(error => console.error('Erreur de chargement du header:', error));
        }

        if (footer) {
            fetch("HTML/footer.html")
                .then(response => response.text())
                .then(data => footer.innerHTML = data)
                .catch(error => console.error('Erreur de chargement du footer:', error));
        }
    }

    // Initialisation de la galerie
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        if (galleryItems.length === 0) {
            console.warn("Aucune image de galerie trouvée. Assurez-vous que le contenu est bien chargé.");
            return;
        }

        let currentIndex = 0;

        // Créer les éléments du popup
        const popup = document.createElement('div');
        popup.className = 'popup';
        document.body.appendChild(popup);

        const popupImage = document.createElement('img');
        popupImage.className = 'popup-image';
        popup.appendChild(popupImage);

        const prevButton = document.createElement('span');
        prevButton.className = 'popup-prev';
        prevButton.innerHTML = '&lt;';
        popup.appendChild(prevButton);

        const nextButton = document.createElement('span');
        nextButton.className = 'popup-next';
        nextButton.innerHTML = '&gt;';
        popup.appendChild(nextButton);

        // Fonction pour ouvrir le popup
        function openPopup(index) {
            currentIndex = index;
            const imageSrc = galleryItems[currentIndex].src;
            popupImage.src = imageSrc;
            popup.classList.add('open');
        }

        // Fonction pour fermer le popup
        function closePopup() {
            popup.classList.remove('open');
        }

        // Fonction pour afficher l'image précédente
        function showPrevImage() {
            currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
            openPopup(currentIndex);
        }

        // Fonction pour afficher l'image suivante
        function showNextImage() {
            currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
            openPopup(currentIndex);
        }

        // Écouteurs d'événements pour les éléments de la galerie
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openPopup(index));
        });

        // Écouteurs d'événements pour les boutons du popup
        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);

        // Fermer le popup en cliquant à l'extérieur de l'image ou avec la touche Échap
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }

    // Appeler les fonctions après le chargement du DOM
    includeHTML();

    // Charger la section home et initialiser la galerie après le chargement
    fetch('HTML/home.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('home-section').innerHTML = data;
            // Réinitialiser la galerie après l'insertion du contenu
            initializeGallery();
        })
        .catch(error => console.error('Erreur de chargement du home:', error));
});

