document.addEventListener('DOMContentLoaded', function() {
    var carouselContent = document.querySelector('#hoe-werkt .carousel-content');
    var cards = document.querySelectorAll('#hoe-werkt .card');
    var prevBtn = document.querySelector('.carousel-btn.left');
    var nextBtn = document.querySelector('.carousel-btn.right');
    var currentIndex = 0;
    var touchStartX = 0;
    var touchEndX = 0;

    function updateCarousel() {
        if (window.innerWidth <= 768) {
            var cardWidth = cards[0].offsetWidth + 40; // Breedte + gap
            carouselContent.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
        } else {
            carouselContent.style.transform = 'translateX(0)';
        }
        carouselContent.offsetHeight; // Forceert reflow (zoals in de werkende versie)
    }

    // Knoppen
    nextBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            currentIndex++;
            if (currentIndex >= cards.length) {
                currentIndex = 0; // Loop naar begin
            }
            updateCarousel();
            removeSwipeListeners();
            initSwipe(); // Reset swipe na knopgebruik
        }
    });

    prevBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = cards.length - 1; // Loop naar einde
            }
            updateCarousel();
            removeSwipeListeners();
            initSwipe(); // Reset swipe na knopgebruik
        }
    });

    // Swipe-functies
    function handleTouchStart(event) {
        if (window.innerWidth <= 768) {
            touchStartX = event.touches[0].clientX;
        }
    }

    function handleTouchMove(event) {
        if (window.innerWidth <= 768) {
            touchEndX = event.touches[0].clientX;
        }
    }

    function handleTouchEnd(event) {
        if (window.innerWidth <= 768) {
            touchEndX = event.changedTouches[0].clientX;
            var swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > 50) { // Drempel van 50px (iets lager dan 60)
                if (swipeDistance < 0) { // Swipe naar links
                    currentIndex++;
                    if (currentIndex >= cards.length) {
                        currentIndex = 0;
                    }
                } else { // Swipe naar rechts
                    currentIndex--;
                    if (currentIndex < 0) {
                        currentIndex = cards.length - 1;
                    }
                }
                updateCarousel();
                removeSwipeListeners();
                initSwipe(); // Reset listeners na swipe
            }
            touchStartX = 0;
            touchEndX = 0; // Reset posities
        }
    }

    function removeSwipeListeners() {
        carouselContent.removeEventListener('touchstart', handleTouchStart);
        carouselContent.removeEventListener('touchmove', handleTouchMove);
        carouselContent.removeEventListener('touchend', handleTouchEnd);
    }

    function initSwipe() {
        carouselContent.addEventListener('touchstart', handleTouchStart);
        carouselContent.addEventListener('touchmove', handleTouchMove);
        carouselContent.addEventListener('touchend', handleTouchEnd);
    }

    // Resize handler
    function initResize() {
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                carouselContent.style.transform = 'translateX(0)';
            } else {
                updateCarousel();
            }
        });
    }

    // Initialisatie
    function initCarousel() {
        updateCarousel();
        initSwipe();
        initResize();
    }

    initCarousel();
});
