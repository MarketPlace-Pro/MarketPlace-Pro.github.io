// Simple working version
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = '<p>Loading products...</p>';
    
    fetch('products.json')
        .then(r => r.json())
        .then(data => {
            container.innerHTML = data.products.map(product => `
                <div style="border:1px solid #ddd; padding:15px; margin:10px; border-radius:10px;">
                    <h3>${product.name}</h3>
                    <p><strong>$${product.price}</strong></p>
                    <p>${product.description}</p>
                    <div>
                        <button onclick="alert('Added ${product.name} to cart')">Add to Cart</button>
                        <a href="product-detail.html?id=${product.id}" style="margin-left:10px;">View Details</a>
                    </div>
                </div>
            `).join('');
        })
        .catch(err => {
            container.innerHTML = '<p>Error loading products</p>';
        });
});
