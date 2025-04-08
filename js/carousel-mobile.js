document.addEventListener("DOMContentLoaded", function () {
    const carouselContent = document.querySelector('#hoe-werkt .carousel-content');
    const cards = document.querySelectorAll('#hoe-werkt .card');
    const prevBtn = document.querySelector('.carousel-btn.left');
    const nextBtn = document.querySelector('.carousel-btn.right');
    
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
        if (window.innerWidth <= 768) {
            var cardWidth = cards[0].offsetWidth + 40; // Breedte + gap
            carouselContent.style.transform = 'translateX(-' + (index * cardWidth) + 'px)';
            carouselContent.offsetHeight; // Forceert reflow
        } else {
            carouselContent.style.transform = 'translateX(0)';
        }
    }

    // Knoppen
    nextBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            index++;
            if (index >= cards.length) {
                index = 0; // Loop naar begin
            }
            updateCarousel();
            removeSwipeListeners();
            initSwipe();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            index--;
            if (index < 0) {
                index = cards.length - 1; // Loop naar einde
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
        }
    }

    function handleTouchMove(event) {
        if (window.innerWidth <= 768) {
            event.preventDefault(); // Voorkomt scrollen op iOS
        }
    }

    function handleTouchEnd(event) {
        if (window.innerWidth <= 768) {
            touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > 50) { // Drempel van 50px
                if (swipeDistance < 0) { // Swipe naar links
                    index++;
                    if (index >= cards.length) {
                        index = 0;
                    }
                } else { // Swipe naar rechts
                    index--;
                    if (index < 0) {
                        index = cards.length - 1;
                    }
                }
                updateCarousel();
            }
            removeSwipeListeners();
            initSwipe();
            touchStartX = 0;
            touchEndX = 0;
        }
    }

    function removeSwipeListeners() {
        carouselContent.removeEventListener("touchstart", handleTouchStart);
        carouselContent.removeEventListener("touchmove", handleTouchMove);
        carouselContent.removeEventListener("touchend", handleTouchEnd);
    }

    function initSwipe() {
        carouselContent.addEventListener("touchstart", handleTouchStart, { passive: false });
        carouselContent.addEventListener("touchmove", handleTouchMove, { passive: false });
        carouselContent.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    function initResize() {
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                carouselContent.style.transform = "translateX(0)";
            } else {
                updateCarousel();
            }
        });
    }

    function initCarousel() {
        updateCarousel();
        initSwipe();
        initResize();
    }

    initCarousel();
});
