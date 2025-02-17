const imagenService = require("./../services/imagenService");

// Obtener la imagen según el id de la muestra

const getImageById = async (req, res) => {
    try {
        const image = await imagenService.getImagenById(req.params.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva imagen en la base de datos

const createNewImage = async (req, res) => {
    try {
        console.log('req.file:', req.file);  // Agregar log para ver si el archivo está presente
        console.log('req.body:', req.body);  // Ver el contenido de req.body
        // Obtener id_muestra desde req.body, ya que lo estás enviando en formData
        const id_muestra = req.body.id_muestra;  

        if (!id_muestra) {
            return res.status(400).json({ message: "id_muestra no proporcionado" });
        }

        const imagenBuffer = req.file.buffer;  // Obtener el buffer de la imagen
        const mimeType = req.file.mimetype;    // Obtener el tipo MIME de la imagen

        const imagenData = {
            id_muestra,  // Asociar la imagen con el id_muestra
            imagen: imagenBuffer,
            tipo: mimeType,
        };

        const createdImage = await imagenService.createImagen(imagenData);
        res.status(201).json(createdImage);
        
    } catch (error) {
        console.error('Error al crear la imagen:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getImageById,
    createNewImage
}