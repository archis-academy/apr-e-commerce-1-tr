//HASIM - FLASHSALES SECTION START
// Count Down Codes
const day = document.getElementById("tdpr-day");
const hour = document.getElementById("tdpr-hour");
const minute = document.getElementById("tdpr-minute");
const second = document.getElementById("tdpr-second");

const ftrDay = document.getElementById("ftr-day");
const ftrHour = document.getElementById("ftr-hour");
const ftrMinute = document.getElementById("ftr-minute");
const ftrSecond = document.getElementById("ftr-second");

const countDown = (bitisZamani) => {
  const simdikiZaman = new Date().getTime();
  const kalanZaman = bitisZamani - simdikiZaman;
  const gunler = Math.floor(kalanZaman / (1000 * 60 * 60 * 24));
  const saatler = Math.floor(
    (kalanZaman % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const dakikalar = Math.floor((kalanZaman % (1000 * 60 * 60)) / (1000 * 60));
  const saniyeler = Math.floor((kalanZaman % (1000 * 60)) / 1000);
  day.textContent = gunler < 10 ? `0${gunler}` : gunler;
  hour.textContent = saatler < 10 ? `0${saatler}` : saatler;
  minute.textContent = dakikalar < 10 ? `0${dakikalar}` : dakikalar;
  second.textContent = saniyeler < 10 ? `0${saniyeler}` : saniyeler;
  ftrDay.textContent = gunler < 10 ? `0${gunler}` : gunler;
  ftrHour.textContent = saatler < 10 ? `0${saatler}` : saatler;
  ftrMinute.textContent = dakikalar < 10 ? `0${dakikalar}` : dakikalar;
  ftrSecond.textContent = saniyeler < 10 ? `0${saniyeler}` : saniyeler;
  if (kalanZaman <= 0) {
    clearInterval(countDownInterval);
  }
};

const countDownInterval = setInterval(() => {
  countDown(new Date("2024-06-20 00:00:00").getTime());
}, 1000);

//Fetch API codes
const endpoint = "https://fakestoreapi.com/products";
let allProducts = [];
async function getProducts() {
  const response = await fetch(endpoint);
  const products = await response.json();
  allProducts = [...products];
  flashSalesdata = products.slice(0, 8);
  flashSalesArrow(flashSalesdata);
  renderFlashSalesProduct(flashSalesdata);
  changeImage(flashSalesdata);
}

getProducts();

//Render Product Codes
function renderFlashSalesProduct(data) {
  const todaysCards = document.querySelector(".tdpr-cards-container");

  const flashSaleproducts = data
    .map((item) => {
      return `<div class="tpdr-card-item">
  <div class="tpdr-card-image-container" style="background-image: url('${
    item.image
  }');"> <div class="tpdr-card-icons-container">
      <span class="tpdr-card-discount">-50%</span>
      <div class="tpdr-card-icons">
        <a href="" class="tpdr-icon" id="fav-icon-${
          item.id
        }" onclick="addToWishlist(${item.id})">
          <img src="./images/todays-product/heartsmall.png" alt="Heart">
        </a>
        <a href="" class="tpdr-icon">
          <img src="./images/todays-product/quickview.png" alt="Quickview">
        </a>
      </div>
    </div>
    <a href="" class="tpdr-addCart" onclick="addToCart(${
      item.id
    })" >Add To Cart</a>
  </div>
  <div class="tpdr-card-name">${item.title}</div>
  <div class="tpdr-card-amount">
    <span class="tdpr-amount-discounted">$${(
      item.price -
      item.price / 2
    ).toFixed()}</span>
    <span class="tdpr-amount-real">$${item.price}</span>
  </div>
  <div class="stars"></div>
</div>`;
    })
    .join("");

//  BESTSELING-RENDER

const itemsContainer = document.querySelector(
  ".best-selling-items-container"
);

const itemElements = data
  .map((item) => {
    const filledStars = Math.floor(item.rating.rate);
    const halfStar = item.rating.rate % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    const starIcons = `
      ${'<i class="bi bi-star-fill star"></i>'.repeat(filledStars)}
      ${halfStar ? '<i class="bi bi-star-half star"></i>' : ""}
      ${'<i class="bi bi-star star"></i>'.repeat(emptyStars)}
    `;

    return `
    <div class="best-selling-item">
       <div class"bsi__image-wrapper">
        <div class="best-selling-icon">
    <i class="bi bi-bag  before"></i>
    <i class="bi bi-heart after "></i>
  </div>
       </div>
      <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <div class="price-all">
        <p class="price">$${item.price}</p>
        <p class="original-price">$${(item.price * 1.2).toFixed(2)}</p>
        <p>
        </div> 
        
        ${
          item.description.length > 100
            ? item.description.substring(0, 100) + "..."
            : item.description
        }</p>
        <div class="rating">
          ${starIcons}
          <span class="review-text">${item.rating.rate} (${
      item.rating.count
    } reviews)</span>
        </div>
      </div>`;
  })
  .join("");

todaysCards.innerHTML = flashSaleproducts;
itemsContainer.innerHTML = itemElements;
}
//Add To Wishlist Codes
function addToWishlist(productId) {
  const favIcon = document.getElementById(`fav-icon-${productId}`);
  favIcon.classList.toggle("added-wish-list");
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const isProductExist = wishlistProducts.some(
    (element) => element.id === productId
  );
  if (!isProductExist) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, productToAdd])
    );
  } else {
    const newProducts = wishlistProducts.filter(
      (element) => element.id !== productId
    );
    localStorage.setItem("wishlistProducts", JSON.stringify(newProducts));
  }
}

//Add to Cart Codes
function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let cartTotalQuantity =
  JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0;
cartTotalQuantity++;
localStorage.setItem("cartTotalQuantity", cartTotalQuantity);
  const isProductExist = cartProducts.some(
    (element) => element.id === productId
  );
  if (!isProductExist) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );    productToAdd.cartCount = 1;
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, productToAdd])
    );
  } else {
    const productIncremented = cartProducts.find(
      (product) => product.id === productId
    );
    let cartCount = productIncremented.cartCount;
    cartCount++;
    productIncremented.cartCount = cartCount;
    const newProducts = cartProducts.filter(
      (element) => element.id !== productId
    );
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...newProducts, productIncremented])
    );
  }
}

//Cards Left-Right Codes
function flashSalesArrow(data) {
  const cardContainer = document.querySelector(".tdpr-cards-container");
  console.log();
  const arrowLeft = document.querySelector("#tdpr-arrow-left");
  const arrowRight = document.querySelector("#tdpr-arrow-right");
  let deger = 0;

  arrowRight.addEventListener("click", () => {
    const offsetWidth = cardContainer.offsetWidth;
    if (deger > (data.length - offsetWidth / 290) * -290) {
      deger += -290;
      cardContainer.style.left = `${deger}px`;
    }
  });

  arrowLeft.addEventListener("click", () => {
    if (deger < 0) {
      deger += 290;
      cardContainer.style.left = `${deger}px`;
    }
  });
}

//HASIM - FLASHSALES SECTION END

// YIGIT- BESTSELING PRODUCTS START
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      renderFlashSalesProduct(data.slice(0, 6));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
// YIGIT- BESTSELING PRODUCTS END
