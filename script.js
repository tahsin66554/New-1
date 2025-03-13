// Shop Now Button Functionality
function shopNow() {
    alert("Let's explore the Midnight Store!");
}

// Add to Cart Button Functionality
const buttons = document.querySelectorAll('.product-card button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert("Item added to cart!");
    });
});
