// Marketplace Pro with Debugging
console.log("🔄 app.js loaded");

// Global variables
let currentProducts = [];
const productsContainer = document.getElementById('productsContainer');
const PAGE_SIZE = 12;
let currentPage = 1;

// Debug function
function debug(message) {
    console.log("🔍 " + message);
    // Also show on page for mobile debugging
    const debugDiv = document.getElementById('debug') || (function() {
        const div = document.createElement('div');
        div.id = 'debug';
        div.style.cssText = 'position:fixed;top:0;left:0;background:red;color:white;padding:10px;z-index:10000;font-size:12px;';
        document.body.appendChild(div);
        return div;
    })();
    debugDiv.innerHTML += message + '<br>';
}

async function loadProducts() {
    debug("Starting loadProducts...");
    try {
        const response = await fetch('products.json');
        debug("Fetch response received: " + response.status);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        debug("JSON parsed successfully: " + data.products.length + " products");
        return data.products;
    } catch (error) {
        debug("Error in loadProducts: " + error.message);
        // Fallback to local data
        return [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                price: 79.99,
                description: "Test product",
                category: "Electronics",
                image: "https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Headphones"
            }
        ];
    }
}

async function renderProducts() {
    debug("Starting renderProducts...");
    try {
        currentProducts = await loadProducts();
        debug("Products loaded: " + currentProducts.length);
        renderProductsList(currentProducts);
    } catch (error) {
        debug("Error in renderProducts: " + error.message);
    }
}

function renderProductsList(products) {
    debug("Starting renderProductsList with " + products.length + " products");
    const container = productsContainer;
    
    if (!container) {
        debug("❌ ERROR: productsContainer not found!");
        return;
    }
    
    container.innerHTML = '';
    debug("Container cleared");
    
    if (products.length === 0) {
        container.innerHTML = '<p>No products found</p>';
        debug("No products to display");
        return;
    }
    
    products.forEach((product, index) => {
        const productHTML = `
            <div style="border:1px solid #ddd;padding:15px;margin:10px;border-radius:5px;">
                <h3>${product.name}</h3>
                <p><strong>$${product.price}</strong></p>
                <p>${product.description}</p>
                <button onclick="alert('Added ${product.name} to cart')">Add to Cart</button>
            </div>
        `;
        container.innerHTML += productHTML;
    });
    
    debug("✅ " + products.length + " products rendered successfully");
}

function init() {
    debug("=== INIT FUNCTION STARTED ===");
    debug("productsContainer exists: " + (!!productsContainer));
    
    // Start loading products
    renderProducts();
    
    debug("=== INIT FUNCTION COMPLETED ===");
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    debug("DOM loading, adding event listener");
    document.addEventListener('DOMContentLoaded', init);
} else {
    debug("DOM already ready, calling init directly");
    init();
}

debug("app.js execution completed");
