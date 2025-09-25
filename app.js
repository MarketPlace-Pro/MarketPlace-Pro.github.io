// Marketplace Pro with Product Detail Pages
console.log("🔄 app.js loaded");

let currentProducts = [];
const productsContainer = document.getElementById('productsContainer');

// Show loading message immediately
if (productsContainer) {
    productsContainer.innerHTML = '<div style="padding:40px;text-align:center;font-size:1.2em;">🔄 Loading products...</div>';
}

async function loadProducts() {
    console.log("📦 Loading products...");
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        console.log("✅ Loaded", data.products.length, "products");
        return data.products;
    } catch (error) {
        console.error("❌ Error:", error);
        return [];
    }
}

function renderProducts(products) {
    console.log("🎨 Rendering", products.length, "products");
    
    if (!productsContainer) {
        console.error("❌ productsContainer not found!");
        return;
    }
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p style="text-align:center;padding:40px;">No products found</p>';
        return;
    }
    
    // Product cards with links to detail pages
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card" style="border:2px solid #e0e0e0;border-radius:15px;padding:20px;margin:15px;background:white;transition:all 0.3s ease;">
            <img src="${product.image}" alt="${product.name}" style="width:100%;height:200px;object-fit:cover;border-radius:10px;margin-bottom:15px;">
            <h3 style="color:#333;margin:0 0 10px 0;font-size:1.3em;">${product.name}</h3>
            <p style="font-size:1.5em;color:#4CAF50;margin:0 0 10px 0;font-weight:bold;">$${product.price}</p>
            <p style="color:#666;margin:0 0 20px 0;line-height:1.4;">${product.description.substring(0, 100)}...</p>
            
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button style="background:#4CAF50;color:white;border:none;padding:12px 20px;border-radius:8px;cursor:pointer;flex:1;"
                        onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>
                <a href="product-detail.html?id=${product.id}" 
                   style="background:#2196F3;color:white;text-decoration:none;padding:12px 20px;border-radius:8px;text-align:center;flex:1;display:flex;align-items:center;justify-content:center;">
                    🔍 View Details
                </a>
            </div>
        </div>
    `).join('');
    
    // Add hover effects
    const cards = productsContainer.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
    
    console.log("🎉 Products with detail links displayed!");
}

// Add to Cart function
function addToCart(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product) {
        alert(`✅ Added to cart: ${product.name} - $${product.price}`);
        console.log('Added to cart:', product);
    }
}

async function init() {
    console.log("🚀 Initializing...");
    
    // Load products
    currentProducts = await loadProducts();
    
    // Render products
    renderProducts(currentProducts);
    
    console.log("✅ Initialization complete");
}

// Start when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
