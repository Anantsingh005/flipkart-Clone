/**
 * Flipkart Clone - Dynamic Cart Page Logic (cart.js)
 * Accurately renders ONLY the user's selected products added to cart / checkout
 */

document.addEventListener('DOMContentLoaded', () => {
    const itemsBox = document.querySelector('.cart-items-box');
    const placeOrderBtn = document.getElementById('place-order-btn');

    // Retrieve cart items from localStorage
    let cartItems = [];
    try {
        cartItems = JSON.parse(localStorage.getItem('fk_cart_items') || '[]');
    } catch (e) {
        cartItems = [];
    }

    // Default sample if cart is brand new and never modified
    if (!localStorage.getItem('fk_cart_initialized')) {
        cartItems = [
            {
                id: 'FK_init_1',
                title: 'Wireless Bluetooth Earbuds with Deep Bass & ENC',
                price: 999,
                originalPrice: 2999,
                img: './assent/images1.jpg',
                qty: 1
            }
        ];
        localStorage.setItem('fk_cart_items', JSON.stringify(cartItems));
        localStorage.setItem('fk_cart_initialized', 'true');
        localStorage.setItem('fk_cart_count', '1');
    }

    function renderCartItems() {
        if (!itemsBox) return;

        if (cartItems.length === 0) {
            itemsBox.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <i class="fa-solid fa-cart-shopping" style="font-size: 56px; color: #ccc; margin-bottom: 16px;"></i>
                    <h3 style="font-size: 18px; margin-bottom: 8px;">Your Flipkart Cart is Empty!</h3>
                    <p style="color: #878787; font-size: 14px; margin-bottom: 20px;">Explore our categories and add products to your cart.</p>
                    <a href="index.html" style="background: #2874f0; color: #fff; padding: 10px 24px; border-radius: 2px; font-weight: 600; display: inline-block;">Shop Now</a>
                </div>
            `;
            const orderBar = document.querySelector('.order-bar');
            if (orderBar) orderBar.style.display = 'none';
            updateSummary(0, 0, 0);
            return;
        }

        const orderBar = document.querySelector('.order-bar');
        if (orderBar) orderBar.style.display = 'flex';

        itemsBox.innerHTML = cartItems.map((item, idx) => {
            const discountPct = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
            return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-left">
                        <img src="${item.img}" alt="${item.title}">
                        <div class="qty-control">
                            <button class="qty-btn minus-btn" data-idx="${idx}">-</button>
                            <span class="qty-val">${item.qty}</span>
                            <button class="qty-btn plus-btn" data-idx="${idx}">+</button>
                        </div>
                    </div>
                    <div class="item-right">
                        <h3 class="item-title">${item.title}</h3>
                        <p class="item-seller">Seller: RetailNet | <span>Flipkart Assured</span></p>
                        <div class="item-pricing">
                            <span class="current-price">₹${item.price.toLocaleString('en-IN')}</span>
                            <span class="original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>
                            <span class="discount-tag">${discountPct}% Off</span>
                        </div>
                        <p class="delivery-note">Delivery by <span>Tomorrow, 11 PM</span> | Free Delivery</p>
                        <div class="item-actions">
                            <button class="item-action-btn save-later-btn">Save For Later</button>
                            <button class="item-action-btn remove-btn" data-idx="${idx}">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        attachCartEvents();
        recalculateTotals();
    }

    function attachCartEvents() {
        const plusBtns = itemsBox.querySelectorAll('.plus-btn');
        const minusBtns = itemsBox.querySelectorAll('.minus-btn');
        const removeBtns = itemsBox.querySelectorAll('.remove-btn');

        plusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                if (cartItems[idx] && cartItems[idx].qty < 10) {
                    cartItems[idx].qty += 1;
                    syncStorage();
                    renderCartItems();
                }
            });
        });

        minusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                if (cartItems[idx] && cartItems[idx].qty > 1) {
                    cartItems[idx].qty -= 1;
                    syncStorage();
                    renderCartItems();
                }
            });
        });

        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                if (confirm('Are you sure you want to remove this item from your cart?')) {
                    cartItems.splice(idx, 1);
                    syncStorage();
                    renderCartItems();
                }
            });
        });
    }

    function syncStorage() {
        localStorage.setItem('fk_cart_items', JSON.stringify(cartItems));
        const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
        localStorage.setItem('fk_cart_count', totalCount);
    }

    function recalculateTotals() {
        let totalMrp = 0;
        let finalTotal = 0;
        let count = 0;

        cartItems.forEach(item => {
            totalMrp += item.originalPrice * item.qty;
            finalTotal += item.price * item.qty;
            count += item.qty;
        });

        updateSummary(totalMrp, finalTotal, count);
    }

    function updateSummary(totalMrp, finalTotal, count) {
        const discount = totalMrp - finalTotal;

        const priceLabelEl = document.getElementById('price-items-label');
        const mrpEl = document.getElementById('total-mrp');
        const discountEl = document.getElementById('total-discount');
        const finalAmtEl = document.getElementById('final-amount');
        const savingsTextEl = document.getElementById('savings-text');

        if (priceLabelEl) priceLabelEl.textContent = `Price (${count} item${count !== 1 ? 's' : ''})`;
        if (mrpEl) mrpEl.textContent = `₹${totalMrp.toLocaleString('en-IN')}`;
        if (discountEl) discountEl.textContent = `- ₹${discount.toLocaleString('en-IN')}`;
        if (finalAmtEl) finalAmtEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
        if (savingsTextEl) savingsTextEl.textContent = `You will save ₹${discount.toLocaleString('en-IN')} on this order`;
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            alert('Order Placed Successfully! Thank you for shopping on Flipkart.');
            cartItems = [];
            syncStorage();
            renderCartItems();
        });
    }

    // Initial render
    renderCartItems();
});
