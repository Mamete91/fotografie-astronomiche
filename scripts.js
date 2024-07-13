document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Funzione per aprire il modale
    function openModal(src, alt) {
        modal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = alt;
    }

    // Funzione per controllare i parametri dell'URL
    function checkForImageParam() {
        const urlParams = new URLSearchParams(window.location.search);
        const imageName = urlParams.get('image');
        if (imageName) {
            const imageElement = document.querySelector(`img[src='images/${imageName}']`);
            if (imageElement) {
                openModal(imageElement.src, imageElement.alt);
                updateMetaTags(imageElement.src, imageElement.alt);
            }
        } else {
            updateMetaTags(); // Reset to default
        }
    }

    // Aggiungi gli event listener per le immagini
    document.querySelectorAll('.photo-img').forEach(photo => {
        photo.addEventListener('click', function () {
            openModal(this.src, this.alt);
        });
    });

    // Aggiungi l'event listener per il pulsante di chiusura
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Aggiungi gli event listener per i pulsanti di condivisione
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const photoName = this.getAttribute('data-photo');
            const photoUrl = `${window.location.origin}${window.location.pathname}?image=${photoName}`;
            updateMetaTags(`images/${photoName}`, `Guarda questa foto astronomica: ${photoName}`);
            if (navigator.share) {
                navigator.share({
                    title: 'Fotografia Astronomica',
                    text: `Guarda questa foto astronomica: ${photoName}`,
                    url: photoUrl
                }).catch(console.error);
            } else {
                const dummy = document.createElement('textarea');
                document.body.appendChild(dummy);
                dummy.value = photoUrl;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                alert('Link copiato negli appunti: ' + photoUrl);
            }
        });
    });

    // Funzione per aggiornare i meta tag Open Graph
    function updateMetaTags(imageSrc = '', description = 'Guarda le mie fotografie astronomiche.') {
        const metaImage = document.querySelector('meta[property="og:image"]');
        const metaUrl = document.querySelector('meta[property="og:url"]');
        const metaDescription = document.querySelector('meta[property="og:description"]');
        const metaTitle = document.querySelector('meta[property="og:title"]');

        if (imageSrc) {
            metaImage.setAttribute('content', `${window.location.origin}/${imageSrc}`);
            metaUrl.setAttribute('content', window.location.href);
        } else {
            metaImage.setAttribute('content', '');
            metaUrl.setAttribute('content', window.location.href);
        }
        metaDescription.setAttribute('content', description);
        metaTitle.setAttribute('content', 'Le mie Fotografie Astronomiche');
    }

    // Verifica se c'è un parametro dell'immagine nell'URL e apri il modale se esiste
    checkForImageParam();
});
