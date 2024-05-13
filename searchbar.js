const searchInput = document.querySelector(".search_input");

searchInput.addEventListener("keyup", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const items = document.querySelectorAll(".header-list-item li");
  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
