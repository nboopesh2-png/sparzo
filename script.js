const products = [
    { id: 1, name: 'Garam Masala', price: 12.99, image: 'images/products.jpg' },
    { id: 2, name: 'Turmeric Powder', price: 8.50, image: 'images/products.jpg' },
    { id: 3, name: 'Red Chilli Powder', price: 9.99, image: 'images/products.jpg' },
    { id: 4, name: 'Coriander Powder', price: 7.99, image: 'images/products.jpg' },
    { id: 5, name: 'Cumin Seeds', price: 10.50, image: 'images/products.jpg' },
    { id: 6, name: 'Cardamom Pods', price: 15.99, image: 'images/products.jpg' },
];

let cart = [];

// Load Products
function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="₹${product.image}" alt="₹${product.name}">
            <h3>${product.name}</h3>
            <span class="price">₹${product.price.toFixed(2)}</span>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    // Open cart automatically when item is added
    const cartSidebar = document.getElementById('cart-sidebar');
    if (!cartSidebar.classList.contains('active')) {
        cartSidebar.classList.add('active');
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update Items List
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
                <span class="remove-btn" onclick="removeFromCart(${item.id})">Remove</span>
            </div>
            <div class="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    }

    // Update Total
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = totalAmount.toFixed(2);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! This is a demo site, no payment was processed.');
    cart = [];
    updateCart();
    toggleCart();
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Initialize
window.onload = () => {
    loadProducts();
};
