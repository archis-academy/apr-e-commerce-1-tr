const wishlistLink = document.getElementById("wishlist-link");
const cartLink = document.getElementById("cart-link");

wishlistLink.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = "wishlist.html";
});

cartLink.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = "cart.html";
});
