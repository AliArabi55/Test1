// Products data
const products = [
    {
        id: 1,
        name: "باقة ورود حمراء",
        price: 150,
        category: "roses",
        description: "باقة جميلة من الورود الحمراء الطازجة مكونة من 12 وردة",
        image: "🌹"
    },
    {
        id: 2,
        name: "باقة ورود بيضاء",
        price: 130,
        category: "roses",
        description: "باقة أنيقة من الورود البيضاء الطازجة مكونة من 10 وردات",
        image: "🤍"
    },
    {
        id: 3,
        name: "هدية شوكولاتة فاخرة",
        price: 80,
        category: "gifts",
        description: "علبة شوكولاتة فاخرة مستوردة بنكهات متنوعة",
        image: "🍫"
    },
    {
        id: 4,
        name: "باقة ورود ملونة",
        price: 200,
        category: "bouquets",
        description: "باقة مميزة من الورود الملونة مع تنسيق احترافي",
        image: "💐"
    },
    {
        id: 5,
        name: "هدية دب محشو",
        price: 60,
        category: "gifts",
        description: "دب محشو ناعم ولطيف مناسب لجميع الأعمار",
        image: "🧸"
    },
    {
        id: 6,
        name: "باقة ورود وردية",
        price: 120,
        category: "roses",
        description: "باقة رومانسية من الورود الوردية الطازجة",
        image: "🌸"
    },
    {
        id: 7,
        name: "هدية عطر فاخر",
        price: 250,
        category: "gifts",
        description: "عطر فاخر من أجود الأنواع برائحة مميزة",
        image: "🌺"
    },
    {
        id: 8,
        name: "باقة عروس",
        price: 350,
        category: "bouquets",
        description: "باقة عروس فاخرة مع تنسيق خاص للمناسبات المهمة",
        image: "👰"
    },
    {
        id: 9,
        name: "مجموعة هدايا متنوعة",
        price: 180,
        category: "gifts",
        description: "مجموعة مختارة من الهدايا المتنوعة في صندوق أنيق",
        image: "🎁"
    },
    {
        id: 10,
        name: "باقة ورود صفراء",
        price: 110,
        category: "roses",
        description: "باقة مشرقة من الورود الصفراء الطازجة",
        image: "🌻"
    },
    {
        id: 11,
        name: "هدية مجوهرات",
        price: 320,
        category: "gifts",
        description: "قطعة مجوهرات أنيقة في علبة فاخرة",
        image: "💍"
    },
    {
        id: 12,
        name: "باقة ورود مختلطة",
        price: 160,
        category: "bouquets",
        description: "باقة مختلطة من أنواع مختلفة من الورود الطازجة",
        image: "🌷"
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartCount = document.getElementById('cart-count');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load products based on page
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    if (document.getElementById('all-products')) {
        loadAllProducts();
        setupFilters();
    }
    
    if (document.getElementById('cart-content')) {
        loadCartPage();
    }
    
    // Setup mobile navigation
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Setup contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Setup order form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderForm);
    }
});

// Mobile navigation toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Load featured products (first 4 products)
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const featuredProducts = products.slice(0, 4);
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load all products
function loadAllProducts() {
    const container = document.getElementById('all-products');
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price} ريال</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">إضافة للسلة</button>
            </div>
        </div>
    `;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`تم إضافة ${product.name} إلى السلة`);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    if (document.getElementById('cart-content')) {
        loadCartPage();
    }
}

// Update product quantity in cart
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        if (document.getElementById('cart-content')) {
            loadCartPage();
        }
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
        cart = [];
        saveCart();
        updateCartCount();
        loadCartPage();
        showNotification('تم إفراغ السلة');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in navigation
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = `(${totalItems})`;
    }
}

// Load cart page
function loadCartPage() {
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = cart.map(item => createCartItem(item)).join('');
        
        updateCartSummary();
    }
}

// Create cart item HTML
function createCartItem(item) {
    return `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price} ريال</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
            </div>
        </div>
    `;
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `${subtotal} ريال`;
    document.getElementById('total').textContent = `${total} ريال`;
}

// Setup product filters
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const category = card.dataset.category;
        const price = parseInt(card.dataset.price);
        
        let showCard = true;
        
        // Category filter
        if (categoryFilter !== 'all' && category !== categoryFilter) {
            showCard = false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            if (priceFilter === '0-100' && price >= 100) {
                showCard = false;
            } else if (priceFilter === '100-300' && (price < 100 || price > 300)) {
                showCard = false;
            } else if (priceFilter === '300+' && price <= 300) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Checkout functionality
function checkout() {
    document.getElementById('cart-content').style.display = 'none';
    document.getElementById('checkout-form').style.display = 'block';
}

// Go back to cart from checkout
function goBackToCart() {
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('cart-content').style.display = 'block';
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('تم إرسال رسالتك بنجاح. سنتواصل معك قريباً');
    e.target.reset();
}

// Handle order form submission
function handleOrderForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('customer-name'),
        phone: formData.get('customer-phone'),
        email: formData.get('customer-email'),
        address: formData.get('delivery-address'),
        notes: formData.get('delivery-notes')
    };
    
    // Validate required fields
    if (!data.name || !data.phone || !data.address) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Calculate order total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order summary
    const orderSummary = {
        id: generateOrderId(),
        date: new Date().toLocaleDateString('ar-SA'),
        customer: data,
        items: [...cart],
        total: total
    };
    
    // Simulate order processing
    setTimeout(() => {
        showOrderConfirmation(orderSummary);
        cart = [];
        saveCart();
        updateCartCount();
    }, 1000);
    
    showNotification('جاري معالجة طلبك...');
}

// Generate order ID
function generateOrderId() {
    return 'ORD' + Date.now().toString().slice(-6);
}

// Show order confirmation
function showOrderConfirmation(order) {
    const confirmationHTML = `
        <div class="order-confirmation">
            <h2>✅ تم تأكيد طلبك بنجاح</h2>
            <p><strong>رقم الطلب:</strong> ${order.id}</p>
            <p><strong>التاريخ:</strong> ${order.date}</p>
            <p><strong>المجموع:</strong> ${order.total} ريال</p>
            <p>سنتواصل معك خلال 24 ساعة لتأكيد التوصيل</p>
            <button class="btn btn-primary" onclick="window.location.href='index.html'">العودة للرئيسية</button>
        </div>
    `;
    
    document.getElementById('checkout-form').innerHTML = confirmationHTML;
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#f44336' : '#4caf50'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
        direction: rtl;
        text-align: right;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', function() {
    let scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '⬆️';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #e91e63;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: opacity 0.3s ease;
        `;
        scrollTopBtn.onclick = scrollToTop;
        document.body.appendChild(scrollTopBtn);
    }
    
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.display = 'none';
    }
});

// Close mobile menu when clicking on a link
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link') && navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});