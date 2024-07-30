document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modal');
    var modalImg = document.getElementById('modal-img');
    var captionText = document.getElementById('caption');
    var images = document.querySelectorAll('.gallery-item');
    var currentIndex = 0;
    var indicator = document.getElementById('indicator');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var close = document.querySelector('.close');

    images.forEach((img, index) => {
        img.addEventListener('click', function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            currentIndex = index;
            updateIndicator();
            modalImg.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
            modalImg.classList.add('slide-in-right');
        });
    });

    function updateIndicator() {
        if (indicator) {
            indicator.textContent = `${currentIndex + 1}/${images.length}`;
        }
    }

    function showImage(index, direction) {
        modalImg.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right');
        modalImg.classList.add('slide-out-' + direction);

        setTimeout(() => {
            modalImg.src = images[index].src;
            captionText.innerHTML = images[index].alt;
            currentIndex = index;
            updateIndicator();

            modalImg.classList.remove('slide-out-left', 'slide-out-right');
            modalImg.classList.add('slide-in-' + (direction === 'left' ? 'right' : 'left'));
        }, 300); // Adjust this timeout to match the slide-out animation duration
    }

    prev.onclick = function () {
        var newIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(newIndex, 'right'); // Correct direction for sliding out
    };

    next.onclick = function () {
        var newIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(newIndex, 'left'); // Correct direction for sliding out
    };

    var hammer = new Hammer(modalImg);
    hammer.on('swipeleft', function () {
        next.onclick();
    });
    hammer.on('swiperight', function () {
        prev.onclick();
    });

    // Close modal when clicking anywhere outside the image
    modal.onclick = function (e) {
        if (e.target === modal) { // Clicked directly on the modal background
            modal.style.display = 'none';
        }
    };

    // Close modal when clicking the close button
    close.onclick = function () {
        modal.style.display = 'none';
    };
});
