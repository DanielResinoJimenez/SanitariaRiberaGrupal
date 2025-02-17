const Services = require("../services/muestraService");

// OBTENER TODAS LAS MUESTRAS
const getMuestras = async (req, res) => {
    try {
        // Llama al servicio para obtener todas las muestras
        const muestras = await Services.getAllMuestras();
        res.status(200).json(muestras); // Devuelve la lista de muestras con código 200 (OK)
    } catch (error) {
        res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500 (Error interno del servidor)
    }
};

// OBTENER UNA MUESTRA POR ID
const getUnMuestra = async (req, res) => {
    try {
        // Obtiene una muestra específica según el ID proporcionado en la URL
        const muestra = await Services.getUnMuestra(req.params.id);

        // Si se encuentra la muestra, la devuelve con código 200, si no, envía un mensaje de error con código 404
        muestra != null
            ? res.status(200).json(muestra)
            : res.status(404).json({ message: "No se ha encontrado ninguna muestra" });
    } catch (error) {
        res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500
    }
};

// CREAR UNA NUEVA MUESTRA
const createMuestra = async (req, res) => {
    try {
        // Crea una nueva muestra con los datos enviados en el cuerpo de la petición
        const muestra = await Services.createMuestra(req.body);
        res.status(201).json(muestra); // Devuelve la muestra creada con código 201 (Created)
    } catch (error) {
        res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500
    }
};


// POST
const post = async (req, res) => {
    try {
        await Services.post(req.body);
        res.status(201).json({ message: "Registro creado correctamente", data: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT
const put = async (req, res) => {
    try {
        const updatedMuestra = await Services.put(req.body, req.params.id);
        updatedMuestra
            ? res.status(200).json({ message: "Registro actualizado correctamente", data: req.body })
            : res.status(404).json({ message: "No se encontró la muestra para actualizar" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PATCH
const patch = async (req, res) => {
    try {
        const updatedMuestra = await Services.patch(req.body, req.params.id);
        updatedMuestra
            ? res.status(200).json({ message: "Registro actualizado parcialmente", data: req.body })
            : res.status(404).json({ message: "No se encontró la muestra para actualizar" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ELIMINAR UNA MUESTRA
const remove = async (req, res) => {
    try {
        const deletedMuestra = await Services.remove(req.params.id);
        deletedMuestra
            ? res.status(200).json({ message: "Muestra eliminada correctamente" })
            : res.status(404).json({ message: "No se encontró la muestra para eliminar" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportamos las funciones para que puedan ser utilizadas en las rutas del servidor
module.exports = { getMuestras, getUnMuestra, createMuestra, post, put, patch, remove };
