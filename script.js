/**
 * Flipkart Clone - Interactive Features
 * Auto-sliding hero banners, location picker modal, cart counter, and live search
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. HERO BANNER CAROUSEL
    // -------------------------------------------------------------------------
    const bannerImg = document.querySelector('.banner-image img');
    const prevBtn = document.querySelector('.banner-btn.prev');
    const nextBtn = document.querySelector('.banner-btn.next');

    const bannerList = [
        './assent/ban1.webp',
        './assent/ban2.webp',
        './assent/ban3.webp',
        './assent/ban4.webp',
        './assent/ban5.webp',
        './assent/ban6.webp'
    ];

    let currentBannerIdx = 0;
    let bannerInterval = null;

    function showBanner(index) {
        if (!bannerImg) return;
        if (index < 0) currentBannerIdx = bannerList.length - 1;
        else if (index >= bannerList.length) currentBannerIdx = 0;
        else currentBannerIdx = index;

        bannerImg.style.opacity = '0.4';
        setTimeout(() => {
            bannerImg.src = bannerList[currentBannerIdx];
            bannerImg.style.opacity = '1';
        }, 150);
    }

    function startBannerAutoplay() {
        bannerInterval = setInterval(() => {
            showBanner(currentBannerIdx + 1);
        }, 3500);
    }

    function stopBannerAutoplay() {
        if (bannerInterval) clearInterval(bannerInterval);
    }

    if (bannerImg) {
        bannerImg.style.transition = 'opacity 0.25s ease-in-out';
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stopBannerAutoplay();
                showBanner(currentBannerIdx - 1);
                startBannerAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stopBannerAutoplay();
                showBanner(currentBannerIdx + 1);
                startBannerAutoplay();
            });
        }

        const bannerContainer = document.querySelector('.banner-container');
        if (bannerContainer) {
            bannerContainer.addEventListener('mouseenter', stopBannerAutoplay);
            bannerContainer.addEventListener('mouseleave', startBannerAutoplay);
        }

        startBannerAutoplay();
    }

    // -------------------------------------------------------------------------
    // 2. CART BADGE SYSTEM
    // -------------------------------------------------------------------------
    let cartCount = parseInt(localStorage.getItem('fk_cart_count') || '1', 10);

    function updateCartBadges() {
        const cartElements = document.querySelectorAll('.cart, .nav-item:has(.fa-cart-shopping)');
        cartElements.forEach(el => {
            let badge = el.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                el.style.position = 'relative';
                el.appendChild(badge);
            }
            badge.textContent = cartCount;
            badge.style.display = cartCount > 0 ? 'inline-flex' : 'none';
        });
    }

    updateCartBadges();

    // -------------------------------------------------------------------------
    // 3. LIVE SEARCH FILTER
    // -------------------------------------------------------------------------
    const searchInputs = document.querySelectorAll('.search-box input, .search-container input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.product-card');

            cards.forEach(card => {
                const title = (card.querySelector('h4')?.textContent || '').toLowerCase();
                if (title.includes(query) || query === '') {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 4. DELIVERY LOCATION PICKER MODAL
    // -------------------------------------------------------------------------
    const locationBtn = document.querySelector('.location, .ctt-item.location');
    const savedLocation = localStorage.getItem('fk_user_location');

    function applyLocation(city, pin) {
        const locLeftSpan = document.querySelector('.location-left span');
        const locTextH5 = document.querySelector('.location-text h5');
        const displayText = `${city} - ${pin}`;

        if (locLeftSpan) locLeftSpan.textContent = displayText;
        if (locTextH5) locTextH5.textContent = displayText;
        localStorage.setItem('fk_user_location', displayText);
    }

    if (savedLocation) {
        applyLocation(savedLocation.split(' - ')[0] || 'Delhi', savedLocation.split(' - ')[1] || '110001');
    }

    // Create Modal HTML
    const modalHtml = `
        <div id="fk-location-modal" class="fk-modal-backdrop" style="display:none;">
            <div class="fk-modal-content">
                <div class="fk-modal-header">
                    <h3>Choose Delivery Location</h3>
                    <button class="fk-modal-close">&times;</button>
                </div>
                <div class="fk-modal-body">
                    <p class="fk-modal-sub">Select delivery location to see product availability and delivery options</p>
                    <div class="fk-pin-input-box">
                        <input type="text" id="fk-pincode-input" placeholder="Enter 6-digit Pincode" maxlength="6">
                        <button id="fk-pin-apply-btn">Apply</button>
                    </div>
                    <div class="fk-popular-cities">
                        <label>Popular Cities</label>
                        <div class="fk-city-chips">
                            <span data-city="New Delhi" data-pin="110001">New Delhi</span>
                            <span data-city="Mumbai" data-pin="400001">Mumbai</span>
                            <span data-city="Bengaluru" data-pin="560001">Bengaluru</span>
                            <span data-city="Hyderabad" data-pin="500001">Hyderabad</span>
                            <span data-city="Kolkata" data-pin="700001">Kolkata</span>
                            <span data-city="Chennai" data-pin="600001">Chennai</span>
                            <span data-city="Pune" data-pin="411001">Pune</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('fk-location-modal');
    const closeBtn = modal.querySelector('.fk-modal-close');
    const pinApplyBtn = document.getElementById('fk-pin-apply-btn');
    const pinInput = document.getElementById('fk-pincode-input');
    const cityChips = modal.querySelectorAll('.fk-city-chips span');

    function openModal() { modal.style.display = 'flex'; }
    function closeModal() { modal.style.display = 'none'; }

    if (locationBtn) {
        locationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    cityChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const city = chip.getAttribute('data-city');
            const pin = chip.getAttribute('data-pin');
            applyLocation(city, pin);
            closeModal();
            showToast(`Delivery location set to ${city} (${pin})`);
        });
    });

    pinApplyBtn.addEventListener('click', () => {
        const pin = pinInput.value.trim();
        if (pin.length === 6 && !isNaN(pin)) {
            applyLocation('Deliver to', pin);
            closeModal();
            showToast(`Pincode ${pin} applied successfully!`);
        } else {
            alert('Please enter a valid 6-digit Pincode');
        }
    });

    // -------------------------------------------------------------------------
    // 5. TOAST NOTIFICATION UTILITY
    // -------------------------------------------------------------------------
    function showToast(message) {
        let toast = document.getElementById('fk-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'fk-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.className = 'fk-toast show';
        setTimeout(() => {
            toast.className = 'fk-toast';
        }, 2800);
    }

    window.showFlipkartToast = showToast;
    window.addFlipkartCart = () => {
        cartCount++;
        localStorage.setItem('fk_cart_count', cartCount);
        updateCartBadges();
        showToast('Item added to your Flipkart Cart!');
    };

    // -------------------------------------------------------------------------
    // 6. PRODUCT CARD CLICK NAVIGATION (DYNAMIC PRODUCT PASSING)
    // -------------------------------------------------------------------------
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Prevent conflict if clicking inside a button
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

            const imgEl = card.querySelector('img');
            const titleEl = card.querySelector('h4');
            const priceEl = card.querySelector('p');

            // Get clean relative image path or src
            let imgSrc = './assent/images1.jpg';
            if (imgEl) {
                const rawSrc = imgEl.getAttribute('src');
                imgSrc = rawSrc || imgEl.src;
            }

            const title = titleEl ? titleEl.textContent.trim() : 'Flipkart Best Deal Product';
            const price = priceEl ? priceEl.textContent.trim() : '₹999';

            const queryParams = new URLSearchParams({
                title: title,
                price: price,
                img: imgSrc
            });

            window.location.href = `product.html?${queryParams.toString()}`;
        });
    });
});
