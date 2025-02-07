const cassetteRouter = require("express").Router();
const cassette = require("./../database/models/Cassette");

// Petición get para obtener todos los cassettes almacenados en la base de datosd

cassetteRouter.get("/all", async (req, res) => {
    const cassettes = await cassette.findAll();
    res.json(cassettes);
})

// Petición post para registrar un nuevo cassette en la base de datosd

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

// Petición patch para modificar un cassette ya almacenado en la base de datos

cassetteRouter.patch("/:id", (req, res) => {
    const cassettes = cassette.update(
      {
        fecha: req.body.fecha,	
        observaciones: req.body.observaciones,	
        descripcion: req.body.descripcion,	
        caracteristicas: req.body.caracteristicas,	
        organo:	req.body.organo,
      },
      {
        where: {
          id_cassette: req.params.id,
        },
      }
    );
    res.json(cassettes);
  });

// Petición delete para borrar un cassette almacenado en la base de datos.

cassetteRouter.delete("/delete/:id", async (req, res) => {
    const deleteCassette = await cassette.destroy({
        where: { id_cassette: req.params.id }
    })

    res.status(200).json({ message: "Cassette eliminado exitosamente" });

})

module.exports = cassetteRouter;