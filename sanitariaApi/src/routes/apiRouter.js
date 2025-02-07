const apirouter = require("express").Router();
// const { checkToken } = require("./middlewares");

// Variables
const userRouter = require("./userRouter");
const cassetteRouter = require("./cassetteRouter");
const muestraRouter = require("./muestraRouter");
// const fabricantesrouter = require("./fabricanteRouter");
// const comprasrouter = require("./compraRouter");


// Rutas
apirouter.use("/usuarios", userRouter);
apirouter.use("/cassettes", cassetteRouter);
apirouter.use("/muestras", muestraRouter);
// apirouter.use("/vehiculos", vehiculosrouter);
// apirouter.use("/vehiculos",checkToken, vehiculosrouter)
// apirouter.use("/fabricantes", fabricantesrouter);
// apirouter.use("/fabricantes",checkToken, fabricantesrouter)
// apirouter.use("/compras", comprasrouter);


module.exports = apirouter;