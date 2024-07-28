document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    var closeBtn = document.getElementsByClassName("close")[0];
    var prevBtn = document.getElementsByClassName("prev")[0];
    var nextBtn = document.getElementsByClassName("next")[0];
    var currentIndex;

    var images = document.querySelectorAll(".gallery-item");
    images.forEach(function (img, index) {
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            currentIndex = index;
        };
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    prevBtn.onclick = function () {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    };

    nextBtn.onclick = function () {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    };

    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
