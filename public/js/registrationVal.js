const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
    if (!validate()) {
        event.preventDefault();
    }
});


function validate() {

   const name = document.getElementById('name');
   const email = document.getElementById('email');
   const password = document.getElementById('password');
   const rePassword = document.getElementById('repassword');
   

   const nameError = document.querySelector('.NameError');
   const emailError = document.querySelector('.emailError');
   const passError = document.querySelector('.passError');
   const rePassError = document.querySelector('.rePassError');

   const nameRegex = /^[A-Z]/;
   const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


   let isValid = true;

   // Name field
   if (name.value.trim() === '') {
       nameError.textContent = 'Field is required';
       isValid = false;
   } else if (name.value.trim().length < 4) {
       nameError.textContent = "Name must be at least 4 characters";
       isValid = false;
   } else if (!nameRegex.test(name.value.trim())) {
       nameError.textContent = "First letter should be capital";
       isValid = false;
   }

   // Email field
   if (email.value.trim() === '') {
       emailError.textContent = 'Field is required';
       isValid = false;
   }else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Invalid email format."
    isValid = false;
}

   // Password field
   if (password.value.trim() === '') {
       passError.textContent = 'Field is required';
       isValid = false;
   } else if (password.value.length < 4) {
       passError.textContent = 'Password must be at least 4 characters long';
       isValid = false;
   }

   // Re-enter Password field
   if (rePassword.value.trim() === '') {
       rePassError.textContent = 'Field is required';
       isValid = false;
   } else if (rePassword.value.trim() !== password.value.trim()) {
       rePassError.textContent = 'Passwords do not match';
       isValid = false;
   }

   // Clear error messages if all validations pass
   if (isValid) {
       nameError.textContent = '';
       emailError.textContent = '';
       passError.textContent = '';
       rePassError.textContent = '';
   }

   return isValid;
}
const alert = document.getElementById('alert')
setTimeout(()=>{
    alert.style.display = 'none'
},3000)