const Imagen = require("./../database/models/Imagen");

const getOneImage = async (id) => {
    try{
        return await Imagen.findByPk(id);
    }catch (error) {
        throw new Error("Error al pedir la imagen por el id: " + error.message);
    }
}

const getImagenById = async (id) => {
    try{
        return await Imagen.findAll({where: {id_muestra: id}});
    }catch (error) {
        throw new Error("Error al pedir la imagen por el id: " + error.message);
    }
}

const createImagen = async (imagenData) => {
    try {
        return await Imagen.create(imagenData);  // Crear la imagen con los datos
    } catch (error) {
        throw new Error("Error al crear la imagen: " + error.message);
    }
}

module.exports = {getOneImage, createImagen, getImagenById};