document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.photo-img').forEach(photo => {
        photo.addEventListener('click', function () {
            openModal(this.src, this.alt);
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const photoName = this.getAttribute('data-photo');
            const photoUrl = `${window.location.origin}${window.location.pathname}?image=${photoName}`;
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

    function openModal(src, alt) {
        modal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = alt;
    }

    function checkForImageParam() {
        const urlParams = new URLSearchParams(window.location.search);
        const imageName = urlParams.get('image');
        if (imageName) {
            const imageElement = document.querySelector(`img[src='images/${imageName}']`);
            if (imageElement) {
                openModal(imageElement.src, imageElement.alt);
            }
        }
    }

    checkForImageParam();
});
