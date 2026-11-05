document.addEventListener('DOMContentLoaded', () => {
  const placeOrderBtn = document.getElementById('place_order_btn');

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Get current cart items
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }

      // 2. Gather form input values (matching inputs in checkout.html)
      const firstName = document.querySelector('input[placeholder="Sarah"]')?.value || 'Customer';
      const lastName = document.querySelector('input[placeholder="Jenkins"]')?.value || '';
      const email = document.querySelector('input[placeholder="sarah.jenkins@design.co"]')?.value || 'customer@example.com';
      const street = document.querySelector('input[placeholder="123 Main St"]')?.value || '123 Main St';
      const city = document.querySelector('input[placeholder="City"]')?.value || '';
      const state = document.querySelector('input[placeholder="State"]')?.value || '';
      const postalCode = document.querySelector('input[placeholder="10001"]')?.value || '';

      // 3. Calculate order total
      let subtotal = 0;
      cart.forEach(item => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        subtotal += priceNum * item.quantity;
      });
      const tax = 2.00;
      const totalPaid = subtotal + tax;

      // 4. Generate a unique Order Number
      const orderNumber = '#KN-' + Math.floor(10000 + Math.random() * 90000);

      // 5. Create Order Object
      const orderDetails = {
        orderNumber: orderNumber,
        customerName: `${firstName} ${lastName}`.trim(),
        email: email,
        address: `${street}, ${city} ${state} ${postalCode}`.trim(),
        items: cart,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        totalPaid: totalPaid.toFixed(2)
      };

      // 6. Save order details to localStorage & clear current active cart
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      localStorage.removeItem('cart');

      // 7. Redirect to order.html
      window.location.href = 'order.html';
    });
  }
});