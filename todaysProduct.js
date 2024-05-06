const data = {
  flashTime: "2024-05-10 00:00:00",
  flashData: [
    {
      image: "./images/todays-product/img-joystick.png",
      title: "HAVIT HV-G92 Gamepad",
      amount: 160,
      discount: 40,
    },
    {
      image: "./images/todays-product/img-keyboard.png",
      title: "AK-900 Wired Keyboard",
      amount: 1160,
      discount: 35,
    },
    {
      image: "./images/todays-product/img-monitor.png",
      title: "IPS LCD Gaming Monitor",
      amount: 400,
      discount: 30,
    },
    {
      image: "./images/todays-product/img-armchair.png",
      title: "S-Series Comfort Chair ",
      amount: 400,
      discount: 25,
    },
    {
      image: "./images/todays-product/img-monitor.png",
      title: "IPS LCD Gaming Monitor",
      amount: 400,
      discount: 30,
    },
    {
      image: "./images/todays-product/img-armchair.png",
      title: "S-Series Comfort Chair ",
      amount: 400,
      discount: 25,
    },
    {
      image: "./images/todays-product/img-keyboard.png",
      title: "AK-900 Wired Keyboard",
      amount: 1160,
      discount: 35,
    },
  ],
};


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
  hour.textContent =  saatler < 10 ? `0${saatler}` : saatler;
  minute.textContent = dakikalar < 10 ? `0${dakikalar}` : dakikalar;
  second.textContent = saniyeler < 10 ? `0${saniyeler}` : saniyeler;
  if (kalanZaman <= 0) {
    clearInterval(geriSayimID);
  }
};

const countDownInterval = setInterval(()=>{
    countDown(new Date(data.flashTime).getTime());
}, 1000);



//Card Create Codes
const todaysCards = document.querySelector(".tdpr-cards-container");

function createTodaysCardItem(image, discount, title, amount) {
  // Create the main card item element
  const tpdrCardItem = document.createElement("div");
  tpdrCardItem.classList.add("tpdr-card-item");

  // Create the image container element
  const tpdrImageContainer = document.createElement("div");
  tpdrImageContainer.style.backgroundImage = `url('.${image}')`;
  tpdrImageContainer.classList.add("tpdr-card-image-container");

  // Create the icons container element
  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("tpdr-card-icons-container");

  // Create the discount element
  const tpdrDiscount = document.createElement("span");
  tpdrDiscount.classList.add("tpdr-card-discount");
  tpdrDiscount.textContent = `-${discount}%`;

  // Create the icons element
  const icons = document.createElement("div");
  icons.classList.add("tpdr-card-icons");

  // Create heart icon element
  const heartIcon = document.createElement("a");
  heartIcon.href = "#";

  const heartIconImage = document.createElement("span");
  heartIconImage.classList.add("tpdr-icon");
  const heartImage = document.createElement("img");
  heartImage.src = "./images/todays-product/heartsmall.png";
  heartImage.alt = "";
  heartIconImage.appendChild(heartImage);

  heartIcon.appendChild(heartIconImage);

  // Create quickview icon element (similar to heart icon)
  const quickviewIcon = document.createElement("a");
  quickviewIcon.href = "#";

  const quickviewIconImage = document.createElement("span");
  quickviewIconImage.classList.add("tpdr-icon");
  const quickviewImage = document.createElement("img");
  quickviewImage.src = "./images/todays-product/quickview.png";
  quickviewImage.alt = "";
  quickviewIconImage.appendChild(quickviewImage);

  quickviewIcon.appendChild(quickviewIconImage);

  // Append icons to icons container
  icons.appendChild(heartIcon);
  icons.appendChild(quickviewIcon);

  // Append discount and icons to icons container
  iconsContainer.appendChild(tpdrDiscount);
  iconsContainer.appendChild(icons);

  // Create the "Add To Cart" button element
  const addToCartButton = document.createElement("a");
  addToCartButton.classList.add("tpdr-addCart");
  addToCartButton.href = "#";
  addToCartButton.textContent = "Add To Cart";

  // Create the card name element
  const cardName = document.createElement("div");
  cardName.classList.add("tpdr-card-name");
  cardName.textContent = `${title}`;

  // Create the amount container element
  const amountContainer = document.createElement("div");
  amountContainer.classList.add("tpdr-card-amount");

  // Create the discounted amount element
  const discountedAmount = document.createElement("span");
  discountedAmount.classList.add("tdpr-amount-discounted");
  discountedAmount.textContent = `$${amount - (amount * discount) / 100}`;

  // Create the real amount element
  const realAmount = document.createElement("span");
  realAmount.classList.add("tdpr-amount-real");
  realAmount.textContent = `$${amount}`;

  // Append discounted and real amount to amount container
  amountContainer.appendChild(discountedAmount);
  amountContainer.appendChild(realAmount);

  // Create the stars element (assuming this is an empty element for styling)
  const stars = document.createElement("div");
  stars.classList.add("stars");

  // Assemble the card structure
  tpdrImageContainer.appendChild(iconsContainer);
  tpdrImageContainer.appendChild(addToCartButton);
  tpdrCardItem.appendChild(tpdrImageContainer);
  tpdrCardItem.appendChild(cardName);
  tpdrCardItem.appendChild(amountContainer);
  tpdrCardItem.appendChild(stars);

  return tpdrCardItem;
}



data.flashData.forEach((item) => {
  todaysCards.appendChild(
    createTodaysCardItem(item.image, item.discount, item.title, item.amount)
  );
});


//Cards Left-Right
const cardContainer = document.querySelector(".tdpr-cards-container");
const cardWrappper = document.querySelector(".tdpr-cards");
const cardItem = document.querySelectorAll(".tpdr-card-item");
console.log()
const arrowLeft = document.querySelector("#tdpr-arrow-left");
const arrowRight = document.querySelector("#tdpr-arrow-right");
let deger = 0;

arrowRight.addEventListener("click", ()=>{
    if (deger>(data.flashData.length-3)*-270) {
      deger += -270;
    cardContainer.style.left=`${deger}px`;
    }
})

arrowLeft.addEventListener("click", ()=>{
  if(deger<0){
    deger += 270;
  cardContainer.style.left=`${deger}px`;
  }
})




