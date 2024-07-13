document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];
    const modalCloseButton = document.querySelector('.modal-close-button');

    document.querySelectorAll('.photo-img').forEach(photo => {
        photo.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    modalCloseButton.onclick = function () {
        modal.style.display = "none";
    };

    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const photoName = this.getAttribute('data-photo');
            const photoUrl = `${window.location.origin}/${window.location.pathname.replace(/\/$/, '')}/images/${photoName}`;
            const shareText = `Guarda questa foto astronomica: ${photoUrl}`;
            if (navigator.share) {
                navigator.share({
                    title: 'Fotografia Astronomica',
                    text: shareText,
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
});
