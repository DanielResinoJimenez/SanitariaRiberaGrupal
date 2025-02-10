const imagenService = require("./../services/imagenService");

// Obtener la imagen según el id de la muestra

const getImageById = async (req, res) => {
    try {
        const image = await imagenService.getImageById(req.params.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva imagen en la base de datos

const createNewImage = async (req, res) => {
    try{

        const id_muestra = req.params.id;
        const imagenBuffer = req.file.buffer;  
        const mimeType = req.file.mimetype;    

        const imagenData = {
            id_muestra,
            imagen: imagenBuffer,
            tipo: mimeType,
        };

        const createdImage = await imagenService.createNewImage(imagenData);
        res.status(201).json(createdImage);
        
    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getImageById,
    createNewImage
}