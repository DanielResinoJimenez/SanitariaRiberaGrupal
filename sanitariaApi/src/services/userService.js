const User = require("../database/models/User");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");
const generatePassword = require("generate-password-browser");
const emailService = require('./emailService');

// OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
    return await User.findAll();
};

// BUSCAR UN USUARIO POR EMAIL
const getUnUserEmail = async (email_user) => {
    return await User.findOne({ where: { email_user } });
};

// GENERAR CONTRASEÑA

const generateUserPassword = () => {
    return generatePassword.generate({
        length: 18,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        strict: true
    });
};

// ENVIAR CORREO CAMBIO CONTRASEÑA

const resetUserPassword = async (email) => {
    const newPassword = generateUserPassword();
    // Aquí deberías actualizar la contraseña del usuario en la base de datos (encriptada)
    // Por ejemplo: await userModel.updatePassword(email, hash(newPassword));

    const emailSent = await emailService.sendPasswordResetEmail(email, newPassword);

    if (emailSent) {
        return { success: true, message: 'Correo enviado exitosamente.' };
    } else {
        throw new Error('No se pudo enviar el correo.');
    }
};

// CREAR TOKEN DE AUTENTICACIÓN
const createToken = (user) => {
    const payload = {
        usuarioId: user.id_user,
        createdAt: moment().unix(),
        expiredAt: moment().add(8, "hours").unix(),
    };
    return jwt.encode(payload, "Token256");
};

// LOGIN DE USUARIO
const login = async (req) => {
    try {
        const user = await User.findOne({ where: { email_user: req.email_user } });

        if (user && bcrypt.compareSync(req.password, user.password)) {
            return { success: createToken(user) };
        } else {
            return { error: "Usuario o contraseña incorrectos" };
        }
    } catch (error) {
        console.error("Error en login:", error);
        return { error: "Ocurrió un error en el login" };
    }
};

// REGISTRO DE USUARIO
const register = async (user) => {
    try {
        return await User.create({
            nombre_user: user.nombre_user,
            apellidos_user: user.apellidos_user,
            email_user: user.email_user,
            password_user: bcrypt.hashSync(user.password_user, 10),
            rol: "user"
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { message: "Error al registrar usuario" };
    }
};

// MODIFICAR DATOS DE UN USUARIO
const updateUser = async (newUser, email_user) => {
    try {
        const updated = await User.update(newUser, { where: { email_user } });
        return updated[0] ? "Usuario actualizado correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw error;
    }
};

// MODIFICAR CONTRASEÑA DE UN USUARIO LOGUEADO
const updatePassUser = async (newPassword, email_user) => {
    try {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const updated = await User.update({ password: hashedPassword }, { where: { email_user } });
        return updated[0] ? "Contraseña actualizada correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error actualizando contraseña:", error);
        throw error;
    }
};

// MODIFICAR CONTRASEÑA DE UN USUARIO SIN LOGUEAR
const updatePassUserLog = async (newPassword, email_user) => {
    return await updatePassUser(newPassword, email_user);
};

// ELIMINAR UN USUARIO
const remove = async (id) => {
    try {
        const deleted = await User.destroy({ where: { id } });
        return deleted ? "Usuario eliminado correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getUnUserEmail,
    generateUserPassword,
    resetUserPassword,
    register,
    login,
    updateUser,
    updatePassUser,
    updatePassUserLog,
    remove,
};
