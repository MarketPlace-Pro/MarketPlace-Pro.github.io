// Simple guaranteed-to-work version
console.log("🔄 app.js loaded successfully");

document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM fully loaded");
    
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error("❌ productsContainer not found");
        return;
    }
    
    console.log("📦 Loading products...");
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#666;">Loading products...</div>';
    
    // Load products with error handling
    fetch('products.json')
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            console.log("✅ Products loaded:", data.products.length);
            
            // Simple product display that definitely works
            container.innerHTML = data.products.map(product => `
                <div style="border:1px solid #ddd; border-radius:10px; padding:20px; margin:15px; background:white;">
                    <img src="${product.image}" alt="${product.name}" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
                    <h3>${product.name}</h3>
                    <p style="color:#4CAF50; font-size:1.2em; font-weight:bold;">$${product.price}</p>
                    <p>${product.description.substring(0, 80)}...</p>
                    <div style="margin-top:15px;">
                        <button onclick="alert('Added ${product.name} to cart')" 
                                style="background:#4CAF50; color:white; border:none; padding:10px 15px; border-radius:5px; margin-right:10px;">
                            Add to Cart
                        </button>
                        <a href="product-detail.html?id=${product.id}" 
                           style="background:#2196F3; color:white; padding:10px 15px; border-radius:5px; text-decoration:none;">
                            View Details
                        </a>
                    </div>
                </div>
            `).join('');
            
            console.log("🎉 Products displayed successfully");
        })
        .catch(error => {
            console.error("❌ Error loading products:", error);
            container.innerHTML = '<div style="text-align:center;padding:40px;color:red;">Error loading products. Please refresh the page.</div>';
        });
});

console.log("✅ app.js execution completed");
