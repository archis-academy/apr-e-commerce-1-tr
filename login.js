const users = [
  {
    id: 1,
    username: "john_doe",
    password: "john123",
  },
  {
    id: 2,
    username: "jane_doe",
    password: "jane123",
  },
  {
    id: 3,
    username: "jimmy_doe",
    password: "jimmy123",
  },
];

const loginButton = document.getElementById("submit");
const emailPhoneInput = document.getElementById("eMailpHone");
const passwordInput = document.getElementById("password");
const warningMessage = document.createElement("p");
warningMessage.textContent =
  "Please enter a valid email address or phone number and password.";
warningMessage.style.color = "red";
warningMessage.style.display = "none";

loginButton.addEventListener("click", (event) => {
  if (emailPhoneInput.value === "" || passwordInput.value === "") {
    event.preventDefault();
    warningMessage.style.display = "block";
    setTimeout(() => {
      warningMessage.style.display = "none";
    }, 3000);
  } else {
    users.forEach((user) => {
      if (
        user.id === 3,2,1 &&
        user.username === emailPhoneInput.value &&
        user.password === passwordInput.value
      ) {
        console.log("Login successful");
        window.location.href = "index.html";
      }
    });
  }
});

const loginForm = document.getElementById("login-form");
loginForm.appendChild(warningMessage);