// CyberQuest — lesson.js

let currentSlide = 0;
const visited = new Set([0]);

function updateSlideUI() {
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counter = document.getElementById('slide-counter');
    const footer  = document.getElementById('lesson-footer');

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
        d.classList.toggle('visited', visited.has(i) && i !== currentSlide);
    });

    prevBtn.disabled = (currentSlide === 0);
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;

    const isLast = (currentSlide === totalSlides - 1);
    if (isLast) {
        nextBtn.style.display = 'none';
        footer.style.display = 'block';
    } else {
        nextBtn.style.display = '';
        footer.style.display = 'none';
        nextBtn.textContent = '▶';
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        visited.add(currentSlide);
        updateSlideUI();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlideUI();
    }
}

function goToSlide(index) {
    if (visited.has(index) || index === currentSlide + 1) {
        currentSlide = index;
        visited.add(index);
        updateSlideUI();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft')  prevSlide();
});

document.addEventListener('DOMContentLoaded', () => {
    updateSlideUI();
});
