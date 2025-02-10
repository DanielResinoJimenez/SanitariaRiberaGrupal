const cassetteService = require("../services/cassetteService");

// OBTENER TODOS LOS CASSETTES
const getAllCassettes = async (req, res) => {
    try {
        const cassettes = await cassetteService.getAllCassettes();
        res.status(200).json(cassettes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER UN CASSETTE
const getUnCassette = async (req, res) => {
    try {
        const cassette = await cassetteService.getUnCassette(req.params.id);
        cassette
            ? res.status(200).json(cassette)
            : res.status(404).json({ message: "No se ha encontrado ningún cassette" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREAR UN CASSETTE
const createCassette = async (req, res) => {
    try {
        const cassette = await cassetteService.createCassetteService(req.body);
        res.status(201).json(cassette);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER CASSETTE POR ORGANO
const getPorOrgano = async (req, res) => {
    try {
        const cassette = await cassetteService.SearchPorOrgano(req.params.organo);
        cassette
            ? res.status(200).json(cassette)
            : res.status(404).json({ message: "No se ha encontrado ningún cassette para ese órgano" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER SOLO ORGANOS
const onlyOrganos = async (req, res) => {
    try {
        const organos = await cassetteService.getOnlyOrganos();
        res.status(200).json(organos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER CASSETTE POR FECHA
const getPorFecha = async (req, res) => {
    try {
        const cassette = await cassetteService.SearchPorFecha(req.params.date);
        cassette
            ? res.status(200).json(cassette)
            : res.status(404).json({ message: "No se ha encontrado ningún cassette para esa fecha" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// MODIFICAR CASSETTE
const updateCassette = async (req, res) => {
    try {
        const updatedCassette = await cassetteService.updateCassette(req.body, req.params.id);
        updatedCassette
            ? res.status(200).json({ message: `El cassette con ID ${req.params.id} se ha modificado correctamente` })
            : res.status(404).json({ message: "El cassette no se ha encontrado o no se ha modificado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// BORRAR CASSETTE
const deleteCassette = async (req, res) => {
    try {
        const deletedCassette = await cassetteService.deleteCassette(req.params.id);
        deletedCassette
            ? res.status(200).json({ message: "El cassette se ha borrado correctamente" })
            : res.status(404).json({ message: "El cassette no se ha encontrado o no se ha podido borrar" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST
const post = async (req, res) => {
    try {
        await cassetteService.post(req.body);
        res.status(201).json({ message: "Registro creado correctamente", data: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT
const put = async (req, res) => {
    try {
        await cassetteService.put(req.body, req.params.id);
        res.status(200).json({ message: "Registro actualizado correctamente", data: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PATCH
const patch = async (req, res) => {
    try {
        await cassetteService.patch(req.body, req.params.id);
        res.status(200).json({ message: "Registro actualizado parcialmente", data: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCassettes,
    getUnCassette,
    createCassette,
    getPorOrgano,
    getPorFecha,
    onlyOrganos,
    updateCassette,
    deleteCassette,
    post,
    put,
    patch
};
