const imagenRouter = require("express").Router();
const imagen = require("./../database/models/Imagen");

// Necesitamos importar estos dos módulos de node para poder subir imágenes a nuestra base de datos.
const path = require("path");
const multer = require("multer")

// Petición get para obtener las imagenes que están asociadas a una muestra específica

imagenRouter.get("/:id", async (req, res) => {
    const imagenes = imagen.findAll({
        where:{
            id_muestra: req.params.id
        }
    })
    res.set("Content-Type", imagenes.tipo);
    res.status(200).json(imagenes.imagen);
})

// Función para subir la imagen en binario a la base de datos
// La función para hacerlo es la siguiente:
// Configuración para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Petición post para subir una imagen de una muestra específica

imagenRouter.post("/subir/:id", upload.single("imagen"), async (req, res) => {
    const id_muestra = req.params.id;

    // Almacenamos los datos de la imagen
    const imagenBuffer = req.file.buffer;  // Aquí está la imagen en formato binario (Buffer)
    const mimeType = req.file.mimetype;    // Tipo de archivo (por ejemplo, image/jpeg)

    const imagenes = await imagen.create({
        id_muestra: id_muestra,
        imagen: imagenBuffer,
        tipo: mimeType,
    })

    res.status(200).json({ mensaje: 'Imagen subida directamente a la base de datos', data: imagenes });
})