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
            carouselContent.offsetHeight; // Forceert reflow
        } else {
            carouselContent.style.transform = 'translateX(0)';
        }
    }

    // Knoppen
    nextBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            currentIndex++;
            if (currentIndex >= cards.length) {
                currentIndex = 0;
            }
            updateCarousel();
            removeSwipeListeners();
            initSwipe();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = cards.length - 1;
            }
            updateCarousel();
            removeSwipeListeners();
            initSwipe();
        }
    });

    // Swipe-functies
    function handleTouchStart(event) {
        if (window.innerWidth <= 768) {
            touchStartX = event.touches[0].clientX;
            console.log('Start: ' + touchStartX); // Debug
        }
    }

    function handleTouchMove(event) {
        if (window.innerWidth <= 768) {
            touchEndX = event.touches[0].clientX;
            console.log('Move: ' + touchEndX); // Debug
            event.preventDefault(); // Voorkomt iOS-scrollen
        }
    }

    function handleTouchEnd(event) {
        if (window.innerWidth <= 768) {
            touchEndX = event.changedTouches[0].clientX;
            var swipeDistance = touchEndX - touchStartX;
            console.log('End, distance: ' + swipeDistance); // Debug

            if (Math.abs(swipeDistance) > 50) {
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
            }
            removeSwipeListeners();
            initSwipe(); // Reset na elke swipe
            touchStartX = 0;
            touchEndX = 0;
        }
    }

    function removeSwipeListeners() {
        carouselContent.removeEventListener('touchstart', handleTouchStart);
        carouselContent.removeEventListener('touchmove', handleTouchMove);
        carouselContent.removeEventListener('touchend', handleTouchEnd);
    }

    function initSwipe() {
        carouselContent.addEventListener('touchstart', handleTouchStart, { passive: false });
        carouselContent.addEventListener('touchmove', handleTouchMove, { passive: false });
        carouselContent.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    // Resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            carouselContent.style.transform = 'translateX(0)';
        } else {
            updateCarousel();
        }
    });

    // Initialisatie
    updateCarousel();
    initSwipe();
});
