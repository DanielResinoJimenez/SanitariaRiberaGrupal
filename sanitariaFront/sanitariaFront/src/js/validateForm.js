const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

// Validate formLogin
const validateLogin = (event) => {
    event.preventDefault();
    let valido = true;
    // Get values
    let email = document.getElementById('emailLogin');
    let errorEmail = document.getElementById('errorEmailLogin');
    let password = document.getElementById('passwordLogin');
    let errorPassword = document.getElementById('errorPasswordLogin');
    
    // Validate email
    if(email.validity.valueMissing){
        errorEmail.textContent = "*Debes de introducir un valor";
        valido = false;
    }else if(email.validity.typeMismatch){
        errorEmail.textContent = "*Formato Incorrecto"
        valido = false;
    }else{
        errorEmail.textContent = "";
    }
    // Validate password
    if (password.validity.valueMissing) {
        errorPassword.textContent = "*Debes de introducir un valor";
        valido = false;
    } else if (password.validity.tooShort || password.validity.tooLong) {
        errorPassword.textContent = "*La contraseña debe tener entre 8 y 16 caracteres";
        valido = false;
    } else if (password.validity.patternMismatch) {
        errorPassword.textContent = "*La contraseña debe incluir mayúsculas, minúsculas, números y símbolos";
        valido = false;
    } else {
        errorPassword.textContent = "";
    }
    // If all fields are correct
    if(valido){
        loginForm.submit();
    }
}
loginButton.addEventListener("click", validateLogin);

// Validate formRegister
const validateRegister = (event) => {
    event.preventDefault();
    let valido = true;
    // Get values
    let name = document.getElementById('name');
    let errorName = document.getElementById('errorName');
    let lastName = document.getElementById('lastName');
    let errorLastName = document.getElementById('errorLastName');
    let email = document.getElementById('emailRegister');
    let errorEmail = document.getElementById('errorEmailRegister');
    let password = document.getElementById('passwordRegister');
    let errorPassword = document.getElementById('errorPasswordRegister');
    let password2 = document.getElementById('password2Register');
    // Validate name
    if(name.validity.valueMissing){
        errorName.textContent = "*Campo Obligatorio";
        valido = false;
    }else{
        errorName.textContent = "";
    }
    // Validate lastName
    if(lastName.validity.valueMissing){
        errorLastName.textContent = "*Campo Obligatorio";
        valido = false;
    }else{  
        errorLastName.textContent = "";
    }
    // Validate email
    if(email.validity.valueMissing){
        errorEmail.textContent = "*Campo Obligatorio";
        valido = false;
    }else if(email.validity.typeMismatch){
        errorEmail.textContent = "*Formato Incorrecto"
        valido = false;
    }else{
        errorEmail.textContent = "";
    }
    // Validate password
    if (password.validity.valueMissing) {
        errorPassword.textContent = "*Campos Obligatorio";
        valido = false;
    } else if (password.validity.tooShort || password.validity.tooLong) {
        errorPassword.textContent = "*La contraseña debe tener entre 8 y 16 caracteres";
        valido = false;
    } else if (password.validity.patternMismatch) {
        errorPassword.textContent = "*La contraseña debe incluir mayúsculas, minúsculas, números y símbolos";
        valido = false;
    } else if (password2.value !== password.value) {
        errorPassword.textContent = "*Las contraseñas no coinciden";
        valido = false;
    } else {
        errorPassword.textContent = "";
    }

    return valido;
}
