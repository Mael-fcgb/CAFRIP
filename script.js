document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('menuOverlay').classList.add('active');
});

document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('menuOverlay').classList.remove('active');
});

// Menu navigation
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Map names to IDs if needed
        const sectionMap = {
            'ACCEUIL': 'home',
            'SHOP': 'shop',
            'CARTE': 'carte'
        };
        
        const target = sectionMap[link.innerText] || link.innerText.toLowerCase();
        const element = document.getElementById(target);
        
        if (element) {
            document.getElementById('menuOverlay').classList.remove('active');
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Reveal animations on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
