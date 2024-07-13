document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.share-button');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];
    const photos = document.querySelectorAll('.photo-img');

    shareButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const photo = this.dataset.photo;
            const url = `http://tuosito.com/images/${photo}`;
            const text = 'Guarda questa fantastica foto astronomica!';
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
});
