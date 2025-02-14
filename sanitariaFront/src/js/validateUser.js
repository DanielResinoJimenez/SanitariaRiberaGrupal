// Rutas
const comprobateUserPass = "http://localhost:3000/usuarios/login";


// Función para validar el usuario y enviar las credenciales
const validarUsuario = async (event) => {
    event.preventDefault(); // Evita la recarga de la página

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    try {
        const response = await fetch(comprobateUserPass, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email_user: email, password_user: password }) // Enviar credenciales
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("token", result.token); // Guardar el token en localStorage
            alert("Inicio de sesión exitoso. Redirigiendo...");
            window.location.href = "../pages/prueba.html"; // Redirigir al dashboard o página protegida
        } else {
            alert(result.error || "Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con el servidor");
    }
};

// Función para verificar autenticación en páginas protegidas
const verificarAutenticacion = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No tienes sesión iniciada. Redirigiendo al login...");
        window.location.href = "login.html"; // Redirigir al login si no hay token
    }
};

// Evento para ejecutar funciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Agregar el evento submit al formulario
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", validarUsuario);
    }

    // Verificar autenticación en páginas protegidas
    if (document.body.getAttribute("data-protected") === "true") {
        verificarAutenticacion();
    }
});
