const Cassette = require("../database/models/Cassette");
const Muestra = require("../database/models/Muestra"); // Asegúrate de importar el modelo de Muestra

// OBTENER UN CASSETTE POR SU ID
const getUnCassette = async (cassetteId) => {
    try {
        return await Cassette.findOne({ where: { id_cassette: cassetteId } });
    } catch (error) {
        console.error("Error obteniendo el cassette:", error);
        throw error;
    }
};

// OBTENER TODOS LOS CASSETTES (LIMITADO A 20 Y ORDENADO POR FECHA ASCENDENTE)
const getAllCassettes = async () => {
    try {
        return await Cassette.findAll({
            order: [['fecha', 'ASC']], // Ordena por fecha ascendente
            limit: 20
        });
    } catch (error) {
        console.error("Error obteniendo cassettes:", error);
        throw error;
    }
};

// CREAR UN NUEVO CASSETTE
const createCassetteService = async (post) => {
    try {
        return await Cassette.create(post);
    } catch (error) {
        console.error("Error creando cassette:", error);
        throw error;
    }
};

// BUSCAR CASSETTES POR ÓRGANO
const SearchPorOrgano = async (organo) => {
    try {
        return await Cassette.findAll({ where: { organo } });
    } catch (error) {
        console.error("Error buscando cassettes por órgano:", error);
        throw error;
    }
};

// BUSCAR CASSETTES POR FECHA
const SearchPorFecha = async (fecha) => {
    try {
        return await Cassette.findAll({ where: { fecha } });
    } catch (error) {
        console.error("Error buscando cassettes por fecha:", error);
        throw error;
    }
};

// OBTENER SOLO LOS ÓRGANOS SIN REPETIR
const getOnlyOrganos = async () => {
    try {
        return await Cassette.findAll({ attributes: ["organo"], group: "organo" });
    } catch (error) {
        console.error("Error obteniendo órganos únicos:", error);
        throw error;
    }
};

// MODIFICAR CASSETTE
const updateCassette = async (newCassette, id) => {
    try {
        const [updated] = await Cassette.update(newCassette, { where: { id_cassette: id } });
        return updated; // Devuelve la cantidad de filas afectadas
    } catch (error) {
        console.error("Error actualizando cassette:", error);
        throw error;
    }
};

// OBTENER MUESTRAS ASOCIADAS A UN CASSETTE
const getMuestras = async (id) => {
    try {
        return await Cassette.findOne({
            where: { id_cassette: id },
            include: {
                model: Muestra,
                order: [['fecha', 'DESC']], // Ordenar muestras por fecha descendente
                limit: 20
            }
        });
    } catch (error) {
        console.error("Error obteniendo muestras de cassette:", error);
        throw error;
    }
};

// CREAR UN NUEVO REGISTRO
const post = async (newCassette) => {
    try {
        return await Cassette.create(newCassette);
    } catch (error) {
        console.error("Error creando cassette:", error);
        return error;
    }
};

// ACTUALIZAR UN REGISTRO (PUT)
const put = async (newCassette, id) => {
    try {
        return await Cassette.update(newCassette, { where: { id_cassette: id } });
    } catch (error) {
        console.error("Error actualizando cassette:", error);
        throw error;
    }
};

// ACTUALIZACIÓN PARCIAL (PATCH)
const patch = async (newCassette, id) => {
    try {
        return await Cassette.update(newCassette, { where: { id_cassette: id } });
    } catch (error) {
        console.error("Error haciendo patch en cassette:", error);
        throw error;
    }
};

//MIRALO PQ NO SE SI HAY QUE ELIMINAR ASI LOS CASSETTES 
const remove = async (id) => {
    try {
        // Primero, eliminamos todas las muestras asociadas al cassette
        await Muestra.destroy({ where: { id_cassette: id } });

        // Luego, eliminamos el cassette
        const deletedCassette = await Cassette.destroy({ where: { id } });

        return deletedCassette ? "Cassette y sus muestras eliminados correctamente" : "Cassette no encontrado";
    } catch (error) {
        console.error("Error eliminando el cassette y sus muestras:", error);
        throw error;
    }
};


// EXPORTAR FUNCIONES
module.exports = {
    getUnCassette,
    getAllCassettes,
    createCassetteService,
    SearchPorOrgano,
    SearchPorFecha,
    getOnlyOrganos,
    updateCassette,
    remove,
    getMuestras,
    put,
    post,
    patch
};
