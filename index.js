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
//* Carousel  Start //
$(".carousel").carousel({
  interval: 3000,
});

$(document).ready(function () {
  $(".carousel-indicators span").click(function () {
    var index = $(this).data("index");
    $("#carouselExampleIndicators").carousel(index);
  });
});
//* Carousel End //

//* Searchbar Start//
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search_input");
  const searchResults = document.querySelector(".search_results");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    if (query.length > 0) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
          const filteredProducts = products.filter(
            (product) =>
              product.title.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query)
          );

          displayResults(filteredProducts);
        });
    } else {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
    }
  });

  function displayResults(products) {
    searchResults.innerHTML = products
      .map(
        (product) => `
          <div class="search-result-item">
              <img src="${product.image}" alt="${product.title}" class="search-result-image">
              <div class="search-result-info">
                  <h4>${product.title}</h4>
                  <p>${product.price}$</p>
              </div>
          </div>
      `
      )
      .join("");
    searchResults.style.display = "block";
  }
});

//* Searchbar End//

