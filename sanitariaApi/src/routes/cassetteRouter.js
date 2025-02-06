const cassetteRouter = require("express").Router();
const cassette = require("./../database/models/Cassette");

cassetteRouter.get("/all", async (req, res) => {
    const cassettes = await cassette.findAll();
    res.json(cassettes);
})

cassetteRouter.post("/register", async (req, res) => {
    const cassettes = await cassette.create({
        fecha: req.body.fecha,	
        observaciones: req.body.observaciones,	
        descripcion: req.body.descripcion,	
        caracteristicas: req.body.caracteristicas,	
        organo:	req.body.organo,
        id_user: req.body.id_user
    });
    res.status(200).json(cassettes);
});

cassetteRouter.delete("/delete/:id_cassette", async (req, res) => {
    const deleteCassette = await cassette.destroy({
        where: { id_cassette: req.params.id_cassette }
    })

    res.status(200).json({ message: "Cassette eliminado exitosamente" });

})

module.exports = cassetteRouter;