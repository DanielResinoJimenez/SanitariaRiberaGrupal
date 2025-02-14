const Services = require("../services/userService");


// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await Services.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar usuario por email
const getUnUserEmail = async (req, res) => {
    try {
        const user = await Services.getUnUserEmail(req.params.email_user);
        user ? res.status(200).json(user) : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generar contraseña
const getGeneratedPassword = (req, res) => {
    try {
        const password = Services.generateUserPassword();
        res.status(200).json({ password });
    } catch (error) {
        res.status(500).json({ error: "Error al generar la contraseña" });
    }
};

// Registro de usuario
const register = async (req, res) => {
    try {
        const user = await Services.register(req.body);
        res.status(201).json({ message: "Usuario registrado correctamente", data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await Services.login(req.body);

        if (result) {
            const token = Services.createToken(result); // Usa la función importada
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Solicitar reseteo de contraseña
const requestPasswordReset = async (req, res) => {
    try {
        const result = await Services.resetUserPassword(req.body.email_user);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error al intentar actualizar la contraseña y enviar el correo." });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const updatedUser = await Services.updateUser(req.body, req.params.email_user);
        updatedUser ? res.status(200).json({ message: `Usuario ${req.params.email_user} actualizado` }) : res.status(404).json({ message: "Usuario no encontrado o sin cambios" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar contraseña usuario logueado
const updatePassUser = async (req, res) => {
    try {
        const updatedPassUser = await Services.updatePassUser(req.body.password_user);
        updatedPassUser ? res.status(200).json({ message: "Contraseña modificada correctamente" }) : res.status(400).json({ message: "No se pudo modificar la contraseña" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar contraseña usuario sin loguear
const updatePassUserLog = async (req, res) => {
    try {
        const updatedPassUserLog = await Services.updatePassUserLog(req.body.password_user);
        updatedPassUserLog ? res.status(200).json({ message: "Contraseña modificada correctamente" }) : res.status(400).json({ message: "No se pudo modificar la contraseña" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar usuario
const remove = async (req, res) => {
    try {
        const deletedUser = await Services.remove(req.params.id_user);
        deletedUser ? res.status(200).json({ message: "Usuario eliminado correctamente" }) : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUnUserEmail,
    getGeneratedPassword,
    requestPasswordReset,
    register,
    login,
    updateUser,
    updatePassUser,
    updatePassUserLog,
    remove
};
