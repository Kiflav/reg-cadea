document.addEventListener('DOMContentLoaded', function() {
    var carouselContent = document.querySelector('#hoe-werkt .carousel-content');
    var cards = document.querySelectorAll('#hoe-werkt .card');
    var prevBtn = document.querySelector('.carousel-btn.left');
    var nextBtn = document.querySelector('.carousel-btn.right');
    var currentIndex = 0;
    var startX = 0;
    var isSwiping = false;

    function updateCarousel() {
        if (window.innerWidth <= 768) {
            var cardWidth = cards[0].offsetWidth + 40; // Breedte + gap
            carouselContent.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
        } else {
            carouselContent.style.transform = 'translateX(0)';
        }
    }

    // Knoppen
    nextBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            currentIndex++;
            if (currentIndex >= cards.length) {
                currentIndex = 0; // Loop naar begin
            }
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = cards.length - 1; // Loop naar einde
            }
            updateCarousel();
        }
    });

    // Swipe
    carouselContent.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768) {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }
    });

    carouselContent.addEventListener('touchmove', function(e) {
        if (isSwiping && window.innerWidth <= 768) {
            e.preventDefault(); // Voorkomt scrollen op iOS
        }
    });

    carouselContent.addEventListener('touchend', function(e) {
        if (isSwiping && window.innerWidth <= 768) {
            var endX = e.changedTouches[0].clientX;
            var diffX = startX - endX;

            if (diffX > 50) { // Swipe naar links
                currentIndex++;
                if (currentIndex >= cards.length) {
                    currentIndex = 0;
                }
                updateCarousel();
            } else if (diffX < -50) { // Swipe naar rechts
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = cards.length - 1;
                }
                updateCarousel();
            }
            isSwiping = false; // Reset swipe-status
        }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Startpositie
});
