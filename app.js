const loginButton = document.getElementById('submit');
const emailPhoneInput = document.getElementById('eMailpHone');
const passwordInput = document.getElementById('password');
const warningMessage = document.createElement('p');
warningMessage.textContent = 'Please enter a valid email address or phone number and password.';
warningMessage.style.color = 'red';
warningMessage.style.display = 'none';


loginButton.addEventListener('click', (event) => {
  if (emailPhoneInput.value === '' || passwordInput.value === '') {
    event.preventDefault();
    warningMessage.style.display = 'block';
    setTimeout(() => {
      warningMessage.style.display = 'none';
    }, 3000);
  }
});

const loginForm = document.getElementById('login-form');
loginForm.appendChild(warningMessage);