
// Wait for the DOM window to fully load
document.addEventListener('DOMContentLoaded', () => {

  // Select elements from the DOM
  const addToCartBtn = document.getElementById('add_to_cart_btn');
  const cartContainer = document.getElementById('cart_items_container');
  const cartTotalPrice = document.getElementById('cart_total_price');

  // Load existing cart array from localStorage (or start with an empty list)
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to display/render cart items on the page
  function renderCart() {
    if (!cartContainer) return;

    // Clear previous elements
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
      if (cartTotalPrice) cartTotalPrice.textContent = '$0.00';
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemRow = document.createElement('div');
      itemRow.classList.add('cart-item-row');
      itemRow.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-title">${item.name}</span>
          <span class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
        </div>
        <button class="remove-btn" data-index="${index}">&times;</button>
      `;

      cartContainer.appendChild(itemRow);
    });

    if (cartTotalPrice) {
      cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Attach remove handlers
    const removeButtons = cartContainer.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemIndex = e.target.getAttribute('data-index');
        removeFromCart(itemIndex);
      });
    });
  }

  // Add item to cart
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      // Product details (Matches your Figma UI)
      const product = {
        id: 'product-1',
        name: 'Product name',
        price: 10.99,
        quantity: 1
      };

      // Check if product is already in cart
      const existingIndex = cart.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(product);
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update button visual state
      addToCartBtn.textContent = 'Added ✓';
      addToCartBtn.style.backgroundColor = '#28a745';
      addToCartBtn.disabled = true;

      // Update the display list immediately
      renderCart();
    });
  }

  // Remove item from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reset "Add to Cart" button if product removed
    if (addToCartBtn) {
      addToCartBtn.textContent = 'Add to cart';
      addToCartBtn.style.backgroundColor = '#000000';
      addToCartBtn.disabled = false;
    }

    renderCart();
  }

  // Initial render when page loads
  renderCart();
});