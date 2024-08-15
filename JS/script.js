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

// Appeler la fonction pour inclure les fichiers HTML
document.addEventListener("DOMContentLoaded", includeHTML);
