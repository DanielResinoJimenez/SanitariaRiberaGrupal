const Services = require("../services/userService");

// OBTENER TODOS LOS USUARIOS
const getUsers = async (req, res) => {
    try {
        const users = await Services.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// BUSCAR UN USUARIO POR EMAIL
const getUnUserEmail = async (req, res) => {
    try {
        const user = await Services.getUnUserEmail(req.params.email_user);
        user
            ? res.status(200).json(user)
            : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// REGISTRO DE USUARIO
const registro = async (req, res) => {
    try {
        const user = await Services.register(req.body);
        res.status(201).json({ message: "Usuario registrado correctamente", data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN DE USUARIO
const login = async (req, res) => {
    try {
        const user = await Services.login(req.body);
        user
            ? res.status(200).json({ message: "Inicio de sesión exitoso", data: user })
            : res.status(401).json({ message: "Credenciales incorrectas" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR USUARIO
const updateUser = async (req, res) => {
    try {
        const updatedUser = await Services.updateUser(req.body, req.params.email_user);
        updatedUser
            ? res.status(200).json({ message: `Usuario ${req.params.email_user} actualizado` })
            : res.status(404).json({ message: "Usuario no encontrado o sin cambios" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// MODIFICAR CONTRASEÑA USER LOGUEADO
const updatePassUser = async (req, res) => {
    try {
        const updatedPassUser = await Services.updatePassUser(req.body.password_user);
        updatedPassUser
            ? res.status(200).json({ message: "Contraseña modificada correctamente" })
            : res.status(400).json({ message: "No se pudo modificar la contraseña" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// MODIFICAR CONTRASEÑA USER SIN LOGUEAR
const updatePassUserLog = async (req, res) => {
    try {
        const updatedPassUserLog = await Services.updatePassUserLog(req.body.password_user);
        updatedPassUserLog
            ? res.status(200).json({ message: "Contraseña modificada correctamente" })
            : res.status(400).json({ message: "No se pudo modificar la contraseña" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREAR UN USUARIO (POST)
const post = async (req, res) => {
    try {
        const resp = await Services.post(req.body);
        if (resp.name === "SequelizeUniqueConstraintError") {
            res.status(409).json({ error: "El email ya está vinculado a una cuenta. Si está registrado, inicie sesión." });
        } else {
            res.status(201).json({ message: "Usuario creado correctamente", data: resp });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR USUARIO COMPLETO (PUT)
const put = async (req, res) => {
    try {
        const updatedUser = await Services.put(req.body, req.params.id_user);
        updatedUser
            ? res.status(200).json({ message: "Usuario actualizado correctamente", data: req.body })
            : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR PARCIALMENTE USUARIO (PATCH)
const patch = async (req, res) => {
    try {
        const updatedUser = await Services.patch(req.body, req.params.id_user);
        updatedUser
            ? res.status(200).json({ message: "Usuario actualizado parcialmente", data: req.body })
            : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ELIMINAR USUARIO
const remove = async (req, res) => {
    try {
        const deletedUser = await Services.remove(req.params.id_user);
        deletedUser
            ? res.status(200).json({ message: "Usuario eliminado correctamente" })
            : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUnUserEmail,
    registro,
    login,
    updateUser,
    updatePassUser,
    updatePassUserLog,
    post,
    put,
    patch,
    remove
};
