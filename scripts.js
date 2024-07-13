document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

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

    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const photoName = this.getAttribute('data-photo');
            const photoUrl = window.location.origin + '/images/' + photoName;
            const shareText = `Guarda questa foto astronomica: ${photoUrl}`;
            if (navigator.share) {
                navigator.share({
                    title: 'Fotografia Astronomica',
                    text: shareText,
                    url: photoUrl
                }).catch(console.error);
            } else {
                prompt('Copia questo link per condividerlo:', photoUrl);
            }
        });
    });
});
