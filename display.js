// Wait for the DOM window to fully load
document.addEventListener('DOMContentLoaded', () => {
  
  const addToCartBtn = document.getElementById('add_to_cart_btn'); // creates a object to the button element

  // Simple click event listener
  addToCartBtn.addEventListener('click', () => {
    // Alert the user or connect to a shopping cart function
    alert('Product has been added to your cart!');
    
    // Change button state dynamically after click
    addToCartBtn.textContent = 'Added ✔';
    addToCartBtn.style.backgroundColor = '#28a745'; // green style change
    addToCartBtn.disabled = true;
  });

});
