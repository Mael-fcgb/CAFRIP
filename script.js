// MENU LOGIC
const menuOverlay = document.getElementById('menuOverlay');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');

if (openMenu && menuOverlay) {
    openMenu.addEventListener('click', () => {
        menuOverlay.classList.add('active');
    });
}

if (closeMenu && menuOverlay) {
    closeMenu.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
    });
}

// CARTE PAGE LOGIC
const productTitle = document.querySelector('.product-title');
if (productTitle) {
    const carteData = {
        drink: {
            title: "CAPUCCINO",
            subtitle: "VOLUME 33CL",
            price: "6,5€",
            image: "coffee-cup.png"
        },
        food: {
            title: "COOKIE CHOCO",
            subtitle: "POIDS 100G",
            price: "3,5€",
            image: "shop1.png"
        }
    };

    document.querySelectorAll('.toggle-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Move-slider-animation
            const slider = document.querySelector('.toggle-slider');
            if (slider) {
                slider.style.transform = `translateX(${index * 100}%)`;
            }

            const type = btn.dataset.type;
            const data = carteData[type];

            if (data) {
                document.querySelector('.product-title').innerText = data.title;
                document.querySelector('.product-subtitle').innerText = data.subtitle;
                document.querySelector('.product-price').innerText = data.price;
                document.querySelector('.product-image').src = data.image;
            }
        });
    });

    document.querySelectorAll('.carousel-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const img = document.querySelector('.product-image');
            img.style.opacity = '0.5';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 200);
        });
    });
}
