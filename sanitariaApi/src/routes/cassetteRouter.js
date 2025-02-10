const cassetteRouter = require("express").Router();
const cassette = require("./../controllers/cassetteController");

cassetteRouter.get("/all", cassette.getAllCassettes);
cassetteRouter.get("/orderbydate/:date", cassette.getPorFecha);
cassetteRouter.get("/orderbyorganos/:organo", cassette.getPorOrgano);
cassetteRouter.get("/:id", cassette.getUnCassette);
cassetteRouter.get("/organos", cassette.onlyOrganos);
cassetteRouter.post("/create", cassette.createCassette);
cassetteRouter.put("/modify/:id", cassette.updateCassette);
cassetteRouter.delete("/delete", cassette.deleteCassette);

module.exports = cassetteRouter;