/**
 * Flipkart Clone - Dynamic Product Page Engine (product.js)
 * Accurately detects and renders any clicked product with matching category,
 * gallery thumbnails, color/size variants, specifications, highlights, and buy confirmation modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. PRODUCT METADATA CATALOG & GENERATOR
    // -------------------------------------------------------------------------
    const catalogPresets = {
        earbuds: {
            brand: 'boAt Audio',
            category: 'Audio & Video > True Wireless',
            highlights: [
                'With Mic: Yes',
                'Bluetooth Version: 5.3 | Wireless Range: 10 meters',
                'Battery Life: Up to 60 Hours Total Playback',
                'ASAP Charge: 10 Mins Charge = 90 Mins Playtime',
                '13 mm Drivers for signature Deep Bass',
                'IPX5 Water & Sweat Resistance'
            ],
            general: [
                ['Model Name', 'True Wireless Stereo Earbuds'],
                ['Connectivity', 'Bluetooth v5.3'],
                ['Headphone Type', 'In the Ear'],
                ['Sales Package', 'Earbuds, Charging Case, Type-C Cable, Extra Eartips, Warranty Card']
            ],
            details: [
                ['Deep Bass', 'Yes (Signature Audio)'],
                ['Sweat Proof', 'Yes (IPX5 Rated)'],
                ['Charging Time', '1.5 Hours'],
                ['Play Time', '60 Hours (With Case)']
            ],
            variants: ['Active Black', 'Royal Blue', 'Pure White']
        },
        watch: {
            brand: 'Noise / Fire-Boltt',
            category: 'Smart Wearables > Smart Watches',
            highlights: [
                '1.85" HD Bright Display with 550 nits peak brightness',
                'Advanced Bluetooth Calling with AI Noise Resistance',
                '120+ Sports Modes & Auto Workout Detection',
                '24/7 Heart Rate, SpO2 & Sleep Tracker',
                'Up to 7 Days Battery Life & IP68 Water Resistance',
                'Inbuilt Voice Assistant (Siri & Google)'
            ],
            general: [
                ['Model Name', 'ColorFit Pro HD Smart Watch'],
                ['Dial Shape', 'Square Curved Display'],
                ['Strap Material', 'Silicone Soft Touch'],
                ['Sales Package', 'Smartwatch, Magnetic Charging Dock, Quick Start Guide, Warranty Card']
            ],
            details: [
                ['Display Resolution', '240 x 284 Pixels'],
                ['Water Resistant', 'Yes (IP68 Rating)'],
                ['Battery Runtime', 'Up to 7 Days Normal Use'],
                ['Sensor Types', 'Optical Heart Rate, SpO2 Blood Oxygen, Accelerometer']
            ],
            variants: ['Midnight Black', 'Slate Grey', 'Rose Gold']
        },
        speaker: {
            brand: 'JBL / boAt Sound',
            category: 'Audio & Video > Bluetooth Speakers',
            highlights: [
                'Power Output: 16W RMS Crystal Clear Audio',
                'Dual Passive Bass Radiators for Punchy Lows',
                'Battery Runtime: Up to 12 Hours Non-stop Playback',
                'IPX7 Fully Waterproof & Dustproof Design',
                'TWS Feature: Pair 2 Speakers for Stereo Sound',
                'Type-C Fast Charging Port'
            ],
            general: [
                ['Model Name', 'Rugged Bass Blast 16W Speaker'],
                ['Configuration', 'Stereo 2.0 Channels'],
                ['Power Source', 'Rechargeable 3000 mAh Li-ion'],
                ['Sales Package', 'Speaker, Type-C Cable, AUX 3.5mm Cable, User Manual']
            ],
            details: [
                ['Frequency Response', '70 Hz - 20000 Hz'],
                ['Bluetooth Range', '15 meters'],
                ['Charging Time', '2.5 Hours'],
                ['Water Resistant', 'Yes (IPX7)']
            ],
            variants: ['Rugged Black', 'Camouflage Green', 'Ocean Blue']
        },
        mouse: {
            brand: 'Logitech / Razer Gear',
            category: 'Computers & Accessories > Gaming Peripherals',
            highlights: [
                'High-Precision 7200 DPI Optical Sensor',
                'RGB Chroma Breathing Backlight with 16.8M Colors',
                '6 Programmable High-Speed Tactile Buttons',
                'Ergonomic Comfort Grip for Extended Gaming Sessions',
                '20 Million Clicks Tested Durability',
                'Braided Heavy-Duty Anti-Tangle Cable'
            ],
            general: [
                ['Model Name', 'G-Pro RGB Optical Gaming Mouse'],
                ['Interface', 'USB 3.0 Wired Gold-Plated'],
                ['Tracking Method', 'Optical High Speed'],
                ['Sales Package', 'Gaming Mouse, Driver Guide, Tuning Weights, Warranty Card']
            ],
            details: [
                ['Max Resolution', '7200 DPI Adjustable on-the-fly'],
                ['Cable Length', '1.8 Meters Braided'],
                ['Acceleration', '20 G Gaming Grade'],
                ['OS Compatibility', 'Windows 11, 10, macOS, Linux']
            ],
            variants: ['Matte Black', 'Cyber White']
        },
        shoes: {
            brand: 'Nike / Puma / Asian',
            category: 'Fashion > Men Footwear > Sports Shoes',
            highlights: [
                'Breathable Knitted Mesh Upper for Ventilation',
                'Ultra-Lightweight Responsive EVA Phylon Sole',
                'Memory Foam Cushioned Insole for Maximum Comfort',
                'Anti-Slip Textured Outsole for Solid Traction',
                'Reinforced Heel Collar for Ankle Support',
                'Ideal for Running, Gym Workouts & Daily Casual Wear'
            ],
            general: [
                ['Model Name', 'Air Max Ultra Running Shoes'],
                ['Ideal For', 'Men'],
                ['Occasion', 'Sports, Running, Casual'],
                ['Sales Package', '1 Pair of Shoes, Extra Laces']
            ],
            details: [
                ['Outer Material', 'Breathable Mesh Fabric'],
                ['Sole Material', 'Lightweight Flexible EVA'],
                ['Closure', 'Lace-Ups'],
                ['Care Instructions', 'Wipe with clean dry cloth']
            ],
            variants: ['UK 7', 'UK 8', 'UK 9', 'UK 10']
        },
        clothing: {
            brand: 'Levi\'s / Allen Solly',
            category: 'Fashion > Men Clothing > Casuals',
            highlights: [
                '100% Pure Premium Combed Cotton',
                'Breathable & Bio-Washed Pre-Shrunk Fabric',
                'Modern Regular Fit with Durable Double-Needle Stitching',
                'Color-Fast Technology: Retains Color After Multiple Washes',
                'Skin-Friendly and Soft Feel All Day Long'
            ],
            general: [
                ['Model Name', 'Premium Cotton Casual Fit'],
                ['Fabric', '100% Combed Cotton'],
                ['Pattern', 'Solid / Textured'],
                ['Sales Package', '1 Unit of Apparel']
            ],
            details: [
                ['Fit', 'Regular Comfortable Fit'],
                ['Sleeve Length', 'Half Sleeves / Full Length'],
                ['Neck Type', 'Crew Neck / Spread Collar'],
                ['Wash Care', 'Gentle Machine Wash in Cold Water']
            ],
            variants: ['Size: S', 'Size: M', 'Size: L', 'Size: XL']
        },
        furniture: {
            brand: 'Flipkart Perfect Homes',
            category: 'Home & Furniture > Living Room Furniture',
            highlights: [
                'High-Density Resilient Foam Cushioning',
                'Termite-Resistant Kiln-Dried Solid Hardwood Frame',
                'Premium Stain-Resistant Fabric Upholstery',
                'Ergonomic Lumbar and Back Support',
                '3 Years Comprehensive Structural Warranty',
                'Free Assembly by Flipkart Certified Technicians'
            ],
            general: [
                ['Model Name', 'Modern Comfort Furniture Collection'],
                ['Primary Material', 'Solid Wood & Engineered Wood'],
                ['Finish Color', 'Teak / Walnut Matte'],
                ['Sales Package', '1 Furniture Unit, Assembly Hardware Kit']
            ],
            details: [
                ['Assembly Required', 'Yes (Provided Free by Seller)'],
                ['Upholstery Material', 'Breathable Fabric / High Grade Leatherette'],
                ['Warranty Summary', '3 Years Domestic Warranty on Manufacturing Defects']
            ],
            variants: ['Walnut Teak', 'Dark Charcoal', 'Classic Beige']
        },
        beauty: {
            brand: 'Wild Stone / Beardo / Mamaearth',
            category: 'Beauty, Toys & More > Personal Care & Fragrance',
            highlights: [
                'Long-Lasting All-Day Luxury Fragrance',
                'Dermatologically Tested & Safe for All Skin Types',
                'Free from Harsh Chemicals, Parabens and Sulfates',
                '100% Original Certified Authentic Ingredients',
                'Refreshing Top Notes with Warm Woody Base Notes'
            ],
            general: [
                ['Product Name', 'Luxury Long-Lasting Fragrance / Care'],
                ['Formulation', 'Liquid / Natural Extracts'],
                ['Quantity', '100 ml / 100 g'],
                ['Sales Package', '1 Unit with Safety Seal']
            ],
            details: [
                ['Fragrance Family', 'Fresh Woody & Citrus'],
                ['Ideal For', 'Men & Women (Unisex)'],
                ['Shelf Life', '36 Months from Date of Manufacturing']
            ],
            variants: ['100 ml', '150 ml', '200 ml']
        },
        default: {
            brand: 'Flipkart SmartBuy',
            category: 'Electronics & Lifestyle > Best Deals',
            highlights: [
                '100% Genuine and Brand Certified Product',
                'Tested & Quality Verified by Flipkart Assured Standards',
                'Superior Build Quality and High Reliability',
                'Comes with 1 Year Official Brand Warranty',
                '7 Days Easy Replacement Guarantee'
            ],
            general: [
                ['Product Line', 'Flipkart Best Seller'],
                ['Condition', 'Brand New Sealed'],
                ['Country of Origin', 'India'],
                ['Sales Package', '1 Unit of Product, Manual, Warranty Documentation']
            ],
            details: [
                ['Quality Check', 'Pass (Grade A)'],
                ['Warranty Summary', '1 Year Manufacturer Warranty']
            ],
            variants: ['Standard Edition', 'Pro Edition']
        }
    };

    // Helper: Match product category preset from title
    function detectPreset(title) {
        const t = (title || '').toLowerCase();
        if (t.includes('earbud') || t.includes('headphone') || t.includes('headset') || t.includes('airdope') || t.includes('audio')) return catalogPresets.earbuds;
        if (t.includes('watch') || t.includes('smartwatch')) return catalogPresets.watch;
        if (t.includes('speaker') || t.includes('soundbar') || t.includes('audio')) return catalogPresets.speaker;
        if (t.includes('mouse') || t.includes('keyboard') || t.includes('gaming') || t.includes('monitor') || t.includes('printer')) return catalogPresets.mouse;
        if (t.includes('shoe') || t.includes('sneaker') || t.includes('boot') || t.includes('sandal')) return catalogPresets.shoes;
        if (t.includes('shirt') || t.includes('jean') || t.includes('tshirt') || t.includes('t-shirt') || t.includes('bag') || t.includes('cloth')) return catalogPresets.clothing;
        if (t.includes('sofa') || t.includes('table') || t.includes('chair') || t.includes('bed') || t.includes('mattress') || t.includes('wardrobe')) return catalogPresets.furniture;
        if (t.includes('perfume') || t.includes('powder') || t.includes('fruit') || t.includes('toy') || t.includes('car') || t.includes('dry')) return catalogPresets.beauty;
        return catalogPresets.default;
    }

    // -------------------------------------------------------------------------
    // 2. PARSE CLICKED PRODUCT FROM URL QUERY
    // -------------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const rawTitle = urlParams.get('title') || 'Flipkart Verified Deal Product';
    const rawPrice = urlParams.get('price') || 'From ₹999';
    const rawImg = urlParams.get('img') || './assent/images1.jpg';

    // Parse exact numerical price
    const digitsMatch = rawPrice.match(/\d[\d,]*/);
    let numericPrice = 999;
    if (digitsMatch) {
        numericPrice = parseInt(digitsMatch[0].replace(/,/g, ''), 10);
    }
    const formattedPrice = `₹${numericPrice.toLocaleString('en-IN')}`;
    const cutPriceVal = Math.round(numericPrice * 2.6);
    const formattedCut = `₹${cutPriceVal.toLocaleString('en-IN')}`;
    const discountPct = Math.round(((cutPriceVal - numericPrice) / cutPriceVal) * 100);

    const preset = detectPreset(rawTitle);

    // -------------------------------------------------------------------------
    // 3. DYNAMICALLY POPULATE ONLY THIS PRODUCT'S CONTENT
    // -------------------------------------------------------------------------
    // Document & Header titles
    document.title = `${rawTitle} Price in India - Flipkart.com`;

    const breadcrumbCat = document.getElementById('breadcrumb-category');
    if (breadcrumbCat) breadcrumbCat.textContent = preset.category.split(' > ')[0];

    const breadcrumbProd = document.getElementById('breadcrumb-product-name');
    if (breadcrumbProd) breadcrumbProd.textContent = rawTitle;

    const brandDisplay = document.getElementById('prod-brand-display');
    if (brandDisplay) brandDisplay.textContent = preset.brand;

    const mainTitle = document.querySelector('.prod-main-title');
    if (mainTitle) {
        mainTitle.textContent = `${preset.brand} ${rawTitle} (Latest Edition, Premium Build)`;
    }

    // Price Elements
    const curPriceEl = document.querySelector('.price-row-display .current-price');
    const cutPriceEl = document.querySelector('.price-row-display .mrp-cut');
    const discountEl = document.querySelector('.price-row-display .discount-pct');
    if (curPriceEl) curPriceEl.textContent = formattedPrice;
    if (cutPriceEl) cutPriceEl.textContent = formattedCut;
    if (discountEl) discountEl.textContent = `${discountPct}% off`;

    // Main Image
    const mainImg = document.getElementById('main-preview-img');
    if (mainImg) {
        mainImg.src = rawImg;
        mainImg.alt = rawTitle;
    }

    // Thumbnails generation matching this product's exact image
    const thumbContainer = document.getElementById('thumbnail-list-container');
    if (thumbContainer) {
        thumbContainer.innerHTML = `
            <div class="thumb-box active" data-img="${rawImg}" title="Front Angle">
                <img src="${rawImg}" alt="${rawTitle} View 1">
            </div>
            <div class="thumb-box" data-img="${rawImg}" title="Detailed View">
                <img src="${rawImg}" alt="${rawTitle} View 2" style="transform: scale(0.95);">
            </div>
            <div class="thumb-box" data-img="${rawImg}" title="Alternative Angle">
                <img src="${rawImg}" alt="${rawTitle} View 3" style="transform: scale(1.05);">
            </div>
        `;

        const thumbBoxes = thumbContainer.querySelectorAll('.thumb-box');
        thumbBoxes.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbBoxes.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                if (mainImg) mainImg.src = thumb.getAttribute('data-img');
            });
        });
    }

    // Variants (Colors or Sizes) matching this product
    const variantList = document.getElementById('variant-list-container');
    const colorLabel = document.getElementById('color-name');
    if (variantList && preset.variants) {
        if (colorLabel) colorLabel.textContent = preset.variants[0];
        variantList.innerHTML = preset.variants.map((v, i) => `
            <div class="variant-chip ${i === 0 ? 'active' : ''}" data-variant="${v}">
                <img src="${rawImg}" alt="${v}" style="width: 26px; height: 26px; object-fit: contain;">
                <span>${v}</span>
            </div>
        `).join('');

        const chips = variantList.querySelectorAll('.variant-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                const name = chip.getAttribute('data-variant');
                if (colorLabel) colorLabel.textContent = name;
            });
        });
    }

    // Dynamic Highlights matching this product
    const highlightsList = document.getElementById('highlights-list-display');
    if (highlightsList && preset.highlights) {
        highlightsList.innerHTML = preset.highlights.map(h => `<li>${h}</li>`).join('');
    }

    // Dynamic Specifications matching this product
    const generalTbody = document.getElementById('spec-general-tbody');
    if (generalTbody && preset.general) {
        generalTbody.innerHTML = `
            <tr><td>Product Name</td><td>${rawTitle}</td></tr>
            <tr><td>Brand</td><td>${preset.brand}</td></tr>
            ${preset.general.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
        `;
    }

    const detailsTbody = document.getElementById('spec-details-tbody');
    if (detailsTbody && preset.details) {
        detailsTbody.innerHTML = preset.details.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    }

    // -------------------------------------------------------------------------
    // 4. WISHLIST TOGGLE
    // -------------------------------------------------------------------------
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            wishlistBtn.classList.toggle('liked');
            if (wishlistBtn.classList.contains('liked')) {
                if (window.showFlipkartToast) window.showFlipkartToast(`Added ${rawTitle} to Wishlist!`);
            } else {
                if (window.showFlipkartToast) window.showFlipkartToast('Removed from Wishlist');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 5. EXACT PRODUCT CART PERSISTENCE
    // -------------------------------------------------------------------------
    const addCartBtn = document.getElementById('btn-add-cart');

    function saveProductToCart(isImmediateRedirect = false) {
        let cartItems = [];
        try {
            cartItems = JSON.parse(localStorage.getItem('fk_cart_items') || '[]');
        } catch (e) {
            cartItems = [];
        }

        // Check if item exists, increment or append
        const existingIdx = cartItems.findIndex(i => i.title === rawTitle);
        if (existingIdx >= 0) {
            cartItems[existingIdx].qty += 1;
        } else {
            cartItems.push({
                id: 'FK_' + Date.now(),
                title: rawTitle,
                price: numericPrice,
                originalPrice: cutPriceVal,
                img: rawImg,
                qty: 1
            });
        }

        localStorage.setItem('fk_cart_items', JSON.stringify(cartItems));

        // Update total count
        const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
        localStorage.setItem('fk_cart_count', totalCount);

        // Update badge
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = totalCount;
            badge.style.display = 'inline-flex';
        }

        if (window.showFlipkartToast) {
            window.showFlipkartToast(`"${rawTitle}" added to Flipkart Cart!`);
        }

        if (isImmediateRedirect) {
            window.location.href = 'cart.html';
        }
    }

    if (addCartBtn) {
        addCartBtn.addEventListener('click', () => {
            saveProductToCart(false);
        });
    }

    // -------------------------------------------------------------------------
    // 6. BUY NOW WITH FLIPKART CONFIRMATION MODAL (EXACT PRODUCT ONLY)
    // -------------------------------------------------------------------------
    const buyNowBtn = document.getElementById('btn-buy-now');
    const buyModal = document.getElementById('buy-confirmation-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('btn-cancel-order');
    const confirmBtn = document.getElementById('btn-confirm-order');
    const continueShoppingBtn = document.getElementById('btn-continue-shopping');

    function openBuyModal() {
        if (!buyModal) return;

        // Populate modal with ONLY this clicked product
        const modalImg = document.getElementById('modal-item-img');
        const modalTitle = document.getElementById('modal-item-title');
        const modalPrice = document.getElementById('modal-item-price');
        const modalTotal = document.getElementById('modal-total-price');

        if (modalImg) modalImg.src = rawImg;
        if (modalTitle) modalTitle.textContent = rawTitle;
        if (modalPrice) modalPrice.textContent = formattedPrice;
        if (modalTotal) modalTotal.textContent = formattedPrice;

        // Reset to checkout view
        const orderContent = document.getElementById('modal-order-content');
        const successContent = document.getElementById('modal-success-content');
        if (orderContent) orderContent.style.display = 'block';
        if (successContent) successContent.style.display = 'none';

        buyModal.style.display = 'flex';
    }

    function closeBuyModal() {
        if (buyModal) buyModal.style.display = 'none';
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openBuyModal();
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeBuyModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeBuyModal);
    if (buyModal) {
        buyModal.addEventListener('click', (e) => {
            if (e.target === buyModal) closeBuyModal();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const selectedMode = document.querySelector('input[name="payment_mode"]:checked')?.value || 'Cash on Delivery';

            const orderContent = document.getElementById('modal-order-content');
            const successContent = document.getElementById('modal-success-content');

            if (orderContent) orderContent.style.display = 'none';
            if (successContent) successContent.style.display = 'block';

            const randomOrderId = 'OD' + Math.floor(100000000000 + Math.random() * 900000000000);
            const orderIdBadge = document.getElementById('success-order-id');
            if (orderIdBadge) {
                orderIdBadge.textContent = `Order ID: ${randomOrderId} | Payment: ${selectedMode}`;
            }

            // Sync order record
            localStorage.setItem('fk_last_order', JSON.stringify({
                orderId: randomOrderId,
                product: rawTitle,
                price: numericPrice,
                img: rawImg,
                date: new Date().toLocaleDateString('en-IN')
            }));

            if (window.showFlipkartToast) {
                window.showFlipkartToast('Order Placed Successfully!');
            }
        });
    }

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            closeBuyModal();
            window.location.href = 'index.html';
        });
    }

    // -------------------------------------------------------------------------
    // 7. DELIVERY PINCODE CHECKER
    // -------------------------------------------------------------------------
    const pinBtn = document.getElementById('pin-check-btn');
    const pinInput = document.getElementById('pin-input');
    if (pinBtn && pinInput) {
        pinBtn.addEventListener('click', () => {
            const pin = pinInput.value.trim();
            if (pin.length === 6 && !isNaN(pin)) {
                if (window.showFlipkartToast) window.showFlipkartToast(`Delivery is available for ${pin}! Guaranteed by Tomorrow.`);
            } else {
                alert('Please enter a valid 6-digit Pincode');
            }
        });
    }
});
