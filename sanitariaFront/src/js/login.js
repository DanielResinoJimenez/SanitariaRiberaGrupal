const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const passwordForm = document.getElementById('passwordForm');
const getPassword = document.getElementById('getPassword');
const buttonPasswordLogin = document.getElementById('showPasswordLogin');
const buttonPasswordRegister = document.getElementById('showPasswordRegister');
const emailNewPass = document.getElementById("emailNewPass")

// Show login or register form
const showForm = (event) => {
    event.preventDefault();
    if(event.target === registerLink) {
        loginForm.classList.add("hiddenForm");
        registerForm.classList.remove("hiddenForm");
    }
    if(event.target == loginLink) {
        loginForm.classList.remove("hiddenForm");
        registerForm.classList.add("hiddenForm");
    }
}
registerLink.addEventListener("click", showForm);
loginLink.addEventListener("click", showForm);

// Show restart password form
const showRestartForm = (event) => {
    event.preventDefault();
    loginForm.classList.add("hiddenForm");
    registerForm.classList.add("hiddenForm");
    passwordForm.classList.remove("hiddenForm");
}
getPassword.addEventListener("click", showRestartForm);

// View password LOGIN
const showPasswordLogin = () => {
    // Get values
    let passwordLogin = document.getElementById('passwordLogin');
    passwordLogin.type = passwordLogin.type === "password" ? "text" : "password";
};
buttonPasswordLogin.addEventListener("click", showPasswordLogin);

// View password REGISTER
const showPasswordRegister = () => {
    // Get values
    let passwordRegister = document.getElementById('passwordRegister');
    let password2Register = document.getElementById('password2Register');
    passwordRegister.type = passwordRegister.type === "password" ? "text" : "password";
    password2Register.type = password2Register.type === "password" ? "text" : "password";
};
buttonPasswordRegister.addEventListener("click", showPasswordRegister);

// Create new Password
const newPassword = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/sanitaria/usuarios/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_user: emailNewPass.value })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Se ha enviado una nueva contraseña a tu correo electrónico");
        } else {
            alert("Hubo un error: " + data.message);
        }
    })
}

passwordForm.addEventListener("submit", newPassword);


