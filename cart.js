//Coupon Fake Data And Codes
const couponData = [
  { couponCode: "HASIM20", discount: 20 },
  { couponCode: "ALPEREN25", discount: 25 },
  { couponCode: "ARCHIS30", discount: 30 },
];

let isDiscounted = false;
document.querySelector(".crt-coupon-button").addEventListener("click", () => {
  const inputValue = document.querySelector("#coupon").value.toUpperCase();
  const notFound = document.querySelector("#crt-coupon-not-found");
  const coupon = couponData.find((item) => item.couponCode == inputValue);
  if (coupon != undefined) {
    if (!isDiscounted) {
      setTotalAmount(coupon.discount);
      isDiscounted = true;
    } else{
      alert("Coupon Code Already Used")
    }
  } else {
    notFound.style.display = "inline";
  }
  
});

// Locale Storage Codes
let cartList = JSON.parse(localStorage.getItem("cartProducts")) || [];
const wishList = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
let cartTotalQuantity =
  JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0;
const listContainer = document.querySelector(".crt-productlist");

//Icon Set Codes
const setIconsQuantity = () => {
  const wishListIcon = document.getElementById("crt-wishlist-quantity");
  const cartListIcon = document.getElementById("crt-cartlist-quantity");
  if (cartTotalQuantity > 0) {
    cartListIcon.style.display = "flex";
    cartListIcon.textContent = cartTotalQuantity;
  } else {
    cartListIcon.style.display = "none";
  }

  if (wishList.length > 0) {
    wishListIcon.style.display = "flex";
    wishListIcon.textContent = wishList.length;
  } else {
    wishListIcon.style.display = "none";
  }
};

setIconsQuantity();

//Total Amount Set Codes
const setTotalAmount = (discount = 0) => {
  const cartSubTotalElement = document.getElementById("crt-subtotal");
  const cartShippingElement = document.getElementById("crt-shipping");
  const cartTotalElement = document.getElementById("crt-total");

  let cartTotalAmount = 0;
  cartList.forEach((element) => {
    cartTotalAmount =
      cartTotalAmount + element.cartCount * element.price.toFixed();
  });

  const discountedAmount =
    cartTotalAmount - ((cartTotalAmount * discount) / 100).toFixed();

  if (cartList.length > 0) {
    cartSubTotalElement.textContent = `$ ${discountedAmount}`;
    if (cartTotalAmount >= 100) {
      cartTotalElement.textContent = `$ ${cartTotalAmount}`;
      cartShippingElement.textContent = "Free";
    } else {
      cartTotalElement.textContent = `$ ${discountedAmount + 50}`;
      cartShippingElement.textContent = "$50";
    }
  } else {
    cartSubTotalElement.textContent = `$0`;
    cartTotalElement.textContent = `$0`;
    cartShippingElement.textContent = "";
  }
};

setTotalAmount();

//Set Total Codes
const setTotal = (productId, productIncremented) => {
  const productCartCount = productIncremented.cartCount;
  const subtotal = productIncremented.price.toFixed() * productCartCount;
  const cartQuantity = document.getElementById(
    `crt-quantity-count-${productId}`
  );

  if (cartQuantity) {
    cartQuantity.textContent =
      productIncremented.cartCount < 10
        ? "0" + productIncremented.cartCount
        : productIncremented.cartCount;
  }

  const productSubtotal = document.getElementById(`subtotal-${productId}`);
  if (productSubtotal) {
    productSubtotal.textContent = subtotal;
  }

  const newProducts = cartList.filter((element) => element.id !== productId);
  localStorage.setItem(
    "cartProducts",
    JSON.stringify([...newProducts, productIncremented])
  );
  const newCartList = JSON.parse(localStorage.getItem("cartProducts")) || [];
  if (newCartList.length > 0) {
    setTotalAmount();
  }
};

//Increment - Decrement Codes
const incrementSubtotal = (productId) => {
  const productIncremented = cartList.find(
    (product) => product.id === productId
  );
  productIncremented.cartCount += 1;
  setTotal(productId, productIncremented);
  cartTotalQuantity++;
  localStorage.setItem("cartTotalQuantity", cartTotalQuantity);
  setIconsQuantity();
};

const decrementSubtotal = (productId) => {
  const productIncremented = cartList.find(
    (product) => product.id === productId
  );
  cartTotalQuantity--;
  localStorage.setItem("cartTotalQuantity", cartTotalQuantity);
  if (productIncremented.cartCount > 1) {
    productIncremented.cartCount -= 1;
    setTotal(productId, productIncremented);
  } else {
    const newProducts = cartList.filter((element) => element.id !== productId);
    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    cartList = newProducts;
    renderProductList();
    setTotalAmount();
  }
  setIconsQuantity();
};

//Render Codes
function renderProductList() {
  if (cartList.length > 0) {
    const cartProductList = cartList
      .map((item) => {
        return `<div class="crt-product-list-item">
   <div class="crt-product-titles">
     <div class="crt-micro-img-container">
       <img src="${item.image}" alt="">
     </div>
     <span>${
       item.title.length < 10 ? item.title : item.title.slice(0, 10) + "..."
     }</span>
   </div>
   <div class="crt-product-titles">$${item.price.toFixed()}</div>
   <div class="crt-product-titles">
   <div class="crt-quantity-container">
          <span class="crt-quantity-count" id="crt-quantity-count-${item.id}" >
            ${item.cartCount < 10 ? "0" + item.cartCount : item.cartCount}
          </span>
          <div class="crt-quantity-buttons">
            <img src="./images/cart-page/dropUpSmall.png" alt="" onclick="incrementSubtotal(${
              item.id
            })"> 
            <img src="./images/cart-page/dropDownSmall.png" alt="" onclick="decrementSubtotal(${
              item.id
            })">
          </div>
        </div>
   </div>
   <div class="crt-product-titles" id="subtotal-${item.id}">$${
          item.price.toFixed() * item.cartCount
        }</div>
 </div>`;
      })
      .join("");

    listContainer.innerHTML = cartProductList;
  } else {
    const empty = `<h1 class="crt-empty">Cart Is Empty</h1>`;
    listContainer.innerHTML = empty;
  }
}

renderProductList();
