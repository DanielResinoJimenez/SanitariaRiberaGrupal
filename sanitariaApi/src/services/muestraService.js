const Muestra = require("../database/models/Muestra");

const getUnMuestra = async (muestraId) => {
    return await Muestra.findOne({ where: { id_muestra: muestraId } });
};

const getAllMuestras = async () => {
    return await Muestra.findAll();
};

const createMuestra = async (body) => {
    try {
        return await Muestra.create(body);
    } catch (error) {
        console.error("Error creando la muestra:", error);
        throw error;
    }
};

const post = async (newMuestra) => {
    try {
        return await Muestra.create(newMuestra);
    } catch (error) {
        console.error("Error en post:", error);
        return error;
    }
};

const put = async (newMuestra, id_muestra) => {
    try {
        const updated = await Muestra.update(newMuestra, { where: { id_muestra } });
        return updated[0] ? "Muestra actualizada correctamente" : "No se encontró la muestra";
    } catch (error) {
        console.error("Error actualizando la muestra:", error);
        throw error;
    }
};

const patch = async (newMuestra, id_muestra) => {
    try {
        const updated = await Muestra.update(newMuestra, { where: { id_muestra } });
        return updated[0] ? "Muestra parcialmente actualizada" : "No se encontró la muestra";
    } catch (error) {
        console.error("Error en patch:", error);
        throw error;
    }
};

const remove = async (id) => {
    try {
        const deleted = await Muestra.destroy({ where: {id_muestra : id} });
        return deleted ? "Muestra eliminada correctamente" : "No se encontró la muestra";
    } catch (error) {
        console.error("Error eliminando la muestra:", error);
        throw error;
    }
};

module.exports = { getUnMuestra, getAllMuestras, createMuestra, post, put, patch, remove };
