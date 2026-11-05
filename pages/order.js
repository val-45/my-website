document.addEventListener('DOMContentLoaded', () => {
  // Load saved order details from localStorage
  const order = JSON.parse(localStorage.getItem('lastOrder'));

  if (!order) {
    console.log("No recent order found.");
    return;
  }

  // Populate Order Meta Info
  const orderNumEl = document.getElementById('order_number');
  const emailEl = document.getElementById('confirm_email');
  const nameEl = document.getElementById('customer_name');
  const addressEl = document.getElementById('customer_address');
  const subtotalEl = document.getElementById('order_subtotal');
  const totalEl = document.getElementById('order_total_paid');

  if (orderNumEl) orderNumEl.textContent = order.orderNumber;
  if (emailEl) emailEl.textContent = order.email;
  if (nameEl) nameEl.textContent = order.customerName;
  if (addressEl) addressEl.textContent = order.address;
  if (subtotalEl) subtotalEl.textContent = `$${order.subtotal}`;
  if (totalEl) totalEl.textContent = `$${order.totalPaid}`;

  // Render Purchased Items List
  const itemsContainer = document.getElementById('order_items_list');
  if (itemsContainer && order.items) {
    itemsContainer.innerHTML = '';
    order.items.forEach(item => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      const itemTotal = (numericPrice * item.quantity).toFixed(2);

      const row = document.createElement('div');
      row.classList.add('summary-item-row');
      row.innerHTML = `
        <span>${item.name} (Qty: ${item.quantity})</span>
        <span>$${itemTotal}</span>
      `;
      itemsContainer.appendChild(row);
    });
  }
});