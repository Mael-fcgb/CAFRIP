// MENU LOGIC
const menuOverlay = document.getElementById('menuOverlay');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

if (openMenu && menuOverlay) {
    openMenu.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        if (themeColorMeta) themeColorMeta.setAttribute('content', '#E5461E');
    });
}

if (closeMenu && menuOverlay) {
    closeMenu.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        if (themeColorMeta) themeColorMeta.setAttribute('content', '#0D2A1C');
    });
}

// CARTE PAGE LOGIC
const productTitle = document.querySelector('.product-title');
if (productTitle) {
    const carteData = {
        drink: [
            {
                title: "CAPUCCINO",
                subtitle: "VOLUME 33CL",
                price: "6,5€",
                image: "coffee-cup.png"
            },
            {
                title: "MATCHA",
                subtitle: "VOLUME 33CL",
                price: "7,0€",
                image: "matcha.png"
            }
        ],
        food: [
            {
                title: "COOKIE CHOCO",
                subtitle: "POIDS 100G",
                price: "3,5€",
                image: "cookie.png"
            }
        ]
    };

    let currentCategory = 'drink';
    let currentIndex = 0;

    function updateProductDisplay(direction = 'fade') {
        const data = carteData[currentCategory][currentIndex];
        const img = document.querySelector('.product-image');

        // Exit animation
        if (direction === 'left') {
            img.style.transform = 'translateX(-50%)';
        } else if (direction === 'right') {
            img.style.transform = 'translateX(50%)';
        }
        img.style.opacity = '0';

        setTimeout(() => {
            document.querySelector('.product-title').innerText = data.title;
            document.querySelector('.product-subtitle').innerText = data.subtitle;
            document.querySelector('.product-price').innerText = data.price;
            img.src = data.image;
            
            // Set starting position for entry
            if (direction === 'left') {
                img.style.transition = 'none';
                img.style.transform = 'translateX(50%)';
            } else if (direction === 'right') {
                img.style.transition = 'none';
                img.style.transform = 'translateX(-50%)';
            }
            
            // Force reflow to apply 'none' transition
            void img.offsetWidth;
            
            // Animate entry to center
            img.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease';
            img.style.transform = 'translateX(0)';
            img.style.opacity = '1';
        }, 300);
    }

    document.querySelectorAll('.toggle-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Move-slider-animation
            const slider = document.querySelector('.toggle-slider');
            if (slider) {
                slider.style.transform = `translateX(${index * 100}%)`;
            }

            currentCategory = btn.dataset.type;
            currentIndex = 0; // Reset to first item of category
            updateProductDisplay();
        });
    });

    document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
        const categoryItems = carteData[currentCategory];
        currentIndex = (currentIndex - 1 + categoryItems.length) % categoryItems.length;
        updateProductDisplay('right');
    });

    document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
        const categoryItems = carteData[currentCategory];
        currentIndex = (currentIndex + 1) % categoryItems.length;
        updateProductDisplay('left');
    });

    // Touch events for Swiping
    const viewport = document.querySelector('.carousel-viewport');
    let touchStartX = 0;

    if (viewport) {
        viewport.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        viewport.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    function handleSwipe(startX, endX) {
        const swipeDistance = endX - startX;
        const threshold = 50; 
        
        if (Math.abs(swipeDistance) > threshold) {
            const categoryItems = carteData[currentCategory];
            if (swipeDistance < 0) {
                // Swiped left (next)
                currentIndex = (currentIndex + 1) % categoryItems.length;
                updateProductDisplay('left');
            } else {
                // Swiped right (prev)
                currentIndex = (currentIndex - 1 + categoryItems.length) % categoryItems.length;
                updateProductDisplay('right');
            }
        }
    }
}
