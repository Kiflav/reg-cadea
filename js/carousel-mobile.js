document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('#hoe-werkt .carousel-wrapper'); // 👈 swipe hierop!
    const carouselContent = document.querySelector('#hoe-werkt .carousel-content');
    const cards = document.querySelectorAll('#hoe-werkt .card');
    const prevBtn = document.querySelector('.carousel-btn.left');
    const nextBtn = document.querySelector('.carousel-btn.right');

    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
        if (window.innerWidth <= 768) {
            const cardWidth = cards[0].offsetWidth + 40; // card + gap
            carouselContent.style.transform = `translateX(-${index * cardWidth}px)`;
        } else {
            carouselContent.style.transform = 'translateX(0)';
        }
    }

    function nextCard() {
        index = (index + 1) % cards.length;
        updateCarousel();
    }

    function prevCard() {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // ✅ Swipe handlers
    function handleTouchStart(e) {
        if (window.innerWidth > 768) return;
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (window.innerWidth > 768) return;
        touchEndX = e.changedTouches[0].clientX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > 40) {
            if (distance < 0) {
                nextCard();
            } else {
                prevCard();
            }
        }
    }

    // ✅ Swipe op de wrapper (die zichtbaar is)
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
});
