document.addEventListener('DOMContentLoaded', () => {
  console.log("Products script loaded successfully!");

  // Select all add-to-cart buttons using their class name
  const addToCartButtons = document.querySelectorAll('.add-cart-btn');
  const cartBadge = document.querySelector('.cart-btn span');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartBadge();

  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      // Find the parent product card
      const productCard = e.target.closest('.product-card');
      if (!productCard) return;

      // Grab the unique ID from the card, or fallback to an index-based ID
      const productId = productCard.id || `product-${index}`;
      
      const titleEl = productCard.querySelector('h3');
      const title = titleEl ? titleEl.textContent.trim() : 'Product';

      const priceEl = productCard.querySelector('.price .current') || productCard.querySelector('.price');
      const price = priceEl ? priceEl.textContent.trim() : '$0.00';

      const product = {
        id: productId,
        name: title,
        price: price,
        quantity: 1
      };

      // Check if product already exists in cart
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(product);
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartBadge();

      // Visual feedback on the button
      const originalText = button.textContent;
      button.textContent = 'Added ✓';
      button.style.backgroundColor = '#16a34a';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#111';
      }, 1500);
    });
  });

  function updateCartBadge() {
    if (cartBadge) {
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalCount;
    }
  }
});