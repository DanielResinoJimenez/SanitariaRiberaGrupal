const imagenRouter = require("express").Router();
const imageController = require("./../controllers/imagenController")

// Necesitamos importar estos dos módulos de node para poder subir imágenes a nuestra base de datos.
const path = require("path");
const multer = require("multer")

// Petición get para obtener las imagenes que están asociadas a una muestra específica

imagenRouter.get("/:id", imageController.getImageById)

// Función para subir la imagen en binario a la base de datos
// La función para hacerlo es la siguiente:
// Configuración para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Petición post para subir una imagen de una muestra específica

imagenRouter.post("/subir/:id", upload.single("imagen"), imageController.createNewImage);