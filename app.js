document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align:center;padding:40px;">Loading products...</div>';
    
    fetch('products.json')
        .then(r => r.json())
        .then(data => {
            container.innerHTML = data.products.map(product => `
                <div style="border:1px solid #ddd; border-radius:10px; padding:20px; margin:15px; background:white;">
                    <img src="${product.image}" alt="${product.name}" style="width:100%; height:200px; object-fit:cover; border-radius:5px;">
                    <h3>${product.name}</h3>
                    <p style="font-size:1.4em; color:#4CAF50; font-weight:bold;">$${product.price}</p>
                    <p>${product.description}</p>
                    <div style="display:flex; gap:10px; margin-top:15px;">
                        <button onclick="addToCart(${product.id})" style="flex:1; padding:10px; background:#4CAF50; color:white; border:none; border-radius:5px;">
                            Add to Cart
                        </button>
                        <a href="product-detail.html?id=${product.id}" style="flex:1; padding:10px; background:#2196F3; color:white; text-decoration:none; text-align:center; border-radius:5px;">
                            View Details
                        </a>
                    </div>
                </div>
            `).join('');
        })
        .catch(err => {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:red;">Error loading products</div>';
        });
});

function addToCart(productId) {
    alert('Product added to cart!');
}
