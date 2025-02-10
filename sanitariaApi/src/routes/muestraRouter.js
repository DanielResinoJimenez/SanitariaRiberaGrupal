const muestraRouter = require("express").Router();
const muestra = require("./../controllers/muestraController");

muestraRouter.get("/all", muestra.getMuestras);
muestraRouter.get("/:id", muestra.getUnMuestra);
muestraRouter.post("/create", muestra.createMuestra);
muestraRouter.get("/delete/:id", muestra.remove);

module.exports = muestraRouter;