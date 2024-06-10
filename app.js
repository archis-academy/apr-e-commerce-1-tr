//HASIM - FLASHSALES SECTION START
// Count Down Codes
const day = document.getElementById("tdpr-day");
const hour = document.getElementById("tdpr-hour");
const minute = document.getElementById("tdpr-minute");
const second = document.getElementById("tdpr-second");
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
  if (kalanZaman <= 0) {
    clearInterval(geriSayimID);
  }
};

const countDownInterval = setInterval(() => {
  countDown(new Date("2024-05-12 00:00:00").getTime());
}, 1000);

//Fetch API codes
const endpoint = "https://fakestoreapi.com/products";
async function getProducts() {
  const response = await fetch(endpoint);
  const products = await response.json();
  flashSalesdata = products.slice(0, 8);
  flashSalesArrow(flashSalesdata);
  renderFlashSalesProduct(flashSalesdata);
}

getProducts();

//Render Product Codes
function renderFlashSalesProduct(data) {
  const todaysCards = document.querySelector(".tdpr-cards-container");

  const products = data
    .map((item) => {
      return `<div class="tpdr-card-item">
  <div class="tpdr-card-image-container" style="background-image: url('${
    item.image
  }');"> <div class="tpdr-card-icons-container">
      <span class="tpdr-card-discount">-50%</span>
      <div class="tpdr-card-icons">
        <a href="#" class="tpdr-icon">
          <img src="./images/todays-product/heartsmall.png" alt="Heart">
        </a>
        <a href="#" class="tpdr-icon">
          <img src="./images/todays-product/quickview.png" alt="Quickview">
        </a>
      </div>
    </div>
    <a href="#" class="tpdr-addCart">Add To Cart</a>
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

  todaysCards.innerHTML = products;
}

//Cards Left-Right Codes
function flashSalesArrow(data) {
  const cardContainer = document.querySelector(".tdpr-cards-container");
  const cardWrappper = document.querySelector(".tdpr-cards");
  const cardItem = document.querySelectorAll(".tpdr-card-item");
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

let exploreContainer = document.querySelector(".exploreContainer");

const source = "https://fakestoreapi.com/products";
async function getData() {
  const res = await fetch(source);
  const data = await res.json();
  exploreData = data.slice(0, 16);
  exploreArrow(exploreData);
  exploreProduct(exploreData);
}

getData();

function exploreProduct(data) {
  const exploreContainer = document.querySelector(".exploreContainer");

  const eleHTML = data.map((ele) => {
    return `<div class="explore-card-item">
       <div class="explore-product-box">
            <div class="explore-item">
              <div class="explore-media">
                <div class="explore-image" style="background-image: url('${ele.image}');">
                </div>
                
                <div class="explore-icon-product">
                  <i class="ri-heart-line"></i>
                  <i class="ri-eye-line"></i>
                </div>
                <div class="explore-text">Add To Cart</div>
              </div>

              <div class="explore-content">
                <h3 class="explore-title-product">
                  ${ele.title}
                </h3>
                <div class="explore-desc-product">
                  <div class="explore-price">
                    $${ele.price}
                  </div>
                  <div class="explore-rating">
                    <div class="stars">
                      <i class="ri-star-fill checked"></i>
                      <i class="ri-star-fill checked"></i>
                      <i class="ri-star-fill checked"></i>
                      <i class="ri-star-fill unchecked"></i>
                      <i class="ri-star-fill unchecked"></i>
                    </div>
                    <span class="mini-text">(35)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>`;
  });

  exploreContainer.innerHTML = eleHTML;
}

function exploreArrow(data) {
  const exploreContainer = document.querySelector(".exploreContainer");
  const exploreWrappper = document.querySelector(".explore-cards");
  const exploreItem = document.querySelectorAll(".explore-card-item");
  console.log();
  const exploreLeft = document.querySelector("#explore-arrow-left");
  const exploreRight = document.querySelector("#explore-arrow-right");
  let deger = 0;

  exploreRight.addEventListener("click", () => {
    const exploreWidth = exploreContainer.exploreWidth;
    if (deger > (data.length - exploreWidth / 400) * -400) {
      deger += -400;
      exploreContainer.style.right = `${deger}px`;
    }
  });

  exploreLeft.addEventListener("click", () => {
    if (deger < 0) {
      deger += 400;
      exploreContainer.style.left = `${deger}px`;
    }
  });
}
