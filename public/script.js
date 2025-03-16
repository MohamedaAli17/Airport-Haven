// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add parallax effect to phone mockup
window.addEventListener('scroll', () => {
    const phoneContainer = document.querySelector('.phone-container');
    const scrolled = window.pageYOffset;
    phoneContainer.style.transform = `translateY(${scrolled * 0.1}px)`;
});

// Add intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.hero-content, .hero-image').forEach((el) => observer.observe(el)); 