// Locale Storage Codes


//Icon Set Codes
const setIconsQuantity = () => {
  let cartTotalQuantity =
  JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0;
const wishList = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const wishListIcon = document.getElementById("wsh-wishlist-quantity");
  const cartListIcon = document.getElementById("wsh-cartlist-quantity");
  const wishLİstTotalQuantity = document.querySelector(
    ".wsh-wishlist-total-quantity"
  );
  if (cartTotalQuantity > 0) {
    cartListIcon.style.display = "flex";
    cartListIcon.textContent = cartTotalQuantity;
  } else {
    cartListIcon.style.display = "none";
  }

  if (wishList.length > 0) {
    wishListIcon.style.display = "flex";
    wishListIcon.textContent = wishList.length;
    wishLİstTotalQuantity.textContent = `Wishlist(${wishList.length})`;
  } else {
    wishListIcon.style.display = "none";
  }
};

setIconsQuantity();

//Wishlist Products Render
function renderWishListProducts() {
const wishList = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const wishlistContainer = document.querySelector(".wsh-productlist");
  if (wishList.length > 0) {
    const wishListProducts = wishList
      .map((item) => {
        return `<div class="wsh-card-item">
    <div class="wsh-card-image-container" style="background-image: url('${item.image}');"> <div class="wsh-card-icons-container">
        <div class="wsh-card-icons">
          <a href="" class="wsh-icon" id="fav-icon-${item.id}" onclick="deleteFromWishlist(${item.id})">
            <img src="./images/wishlist-page/icon-delete.png" alt="Delete">
          </a>
          
        </div>
      </div>
      <a href="" class="wsh-addCart" onclick="addToCart(${item.id})" >Add To Cart</a>
    </div>
    <div class="wsh-card-name">${item.title}</div>
    <div class="wsh-card-amount">
      <span class="wsh-amount-real">$${item.price}</span>
    </div>
    <div class="stars"></div>
  </div>`;
      })
      .join("");

    wishlistContainer.innerHTML = wishListProducts;
  } else {
    const empty = `<h1 class="wsh-empty">Wishlist Is Empty</h1>`;
    wishlistContainer.style.display = "flex";
    wishlistContainer.style.justifyContent = "center";
    wishlistContainer.innerHTML = empty;
  }
}

renderWishListProducts();

//Delete From WishList
function deleteFromWishlist(productId) {
const wishList = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const newProducts = wishList.filter((element) => element.id !== productId);
  localStorage.setItem("wishlistProducts", JSON.stringify(newProducts));
  renderWishListProducts();
  setIconsQuantity();
}

//Add to Cart Codes
function addToCart(productId) {
const wishList = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let cartTotalQuantity =
    JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0;
  cartTotalQuantity++;
  localStorage.setItem("cartTotalQuantity", cartTotalQuantity);
  const isProductExist = cartProducts.some(
    (element) => element.id === productId
  );
  if (!isProductExist) {
    const productToAdd = wishList.find((product) => product.id === productId);
    productToAdd.cartCount = 1;
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
  deleteFromWishlist(productId);
}


// Delete All Products
function deleteAllProducts() {
  localStorage.setItem("wishlistProducts", JSON.stringify([]));
  renderWishListProducts();
  setIconsQuantity();
}

// Add All Products
function addAllProducts() {
const wishList = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const wishListIds = wishList.map((item) => {
    return item.id;
  });
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartListIds = cartProducts.map((item) => {
    return item.id;
  });

  const commonProductId = [];

  wishListIds.forEach((product) => {
    if (cartListIds.includes(product)) {
      commonProductId.push(product);
    }
  });

  if (commonProductId.length > 0) {
    const newcartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const commonProducts = cartProducts.filter((product) => {
      return commonProductId.includes(product.id);
    });
    const notCommonCartProduct = cartProducts.filter((product) => {
      return !commonProductId.includes(product.id);
    });

    const notCommonProducts = wishList.filter((product) => {
      return !commonProductId.includes(product.id);
    });

    const newnotCommonProducts = notCommonProducts.map((product) => {
      return {
        ...product , 
        cartCount: 1
      }
  })

    const newCommonProducts = commonProducts.map((product) => {
      return {
        ...product,
        cartCount: product.cartCount + 1,
      };
    });

    const newProducts = [...newCommonProducts, ...newnotCommonProducts, ...notCommonCartProduct]

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(newProducts)
    );

    
  } else {
    const productsToAdd = wishList.map((product) => {
      return {
        ...product , 
        cartCount: 1
      }
    });
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, ...productsToAdd])
    );
  }
  let cartTotalQuantity =
    JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0;
  cartTotalQuantity = cartTotalQuantity + wishList.length;
  localStorage.setItem("cartTotalQuantity", cartTotalQuantity);
  deleteAllProducts();
}
const addAllProductButton = document.querySelector(".wsh-wishlist-button");
addAllProductButton.addEventListener("click", addAllProducts);
