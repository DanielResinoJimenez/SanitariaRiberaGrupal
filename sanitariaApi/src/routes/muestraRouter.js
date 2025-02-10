const muestraRouter = require("express").Router();
const muestra = require("./../controllers/muestraController");

muestraRouter.get("/all", muestra.getMuestras);
muestraRouter.get("/:id", muestra.getUnMuestra);
muestraRouter.get("/create", muestra.createMuestra);
muestraRouter.get("/delete/:id", muestra.remove);


// // Petición get para mostrar todas las muestras almacenadas en la base de datos

// muestraRouter.get("/all", async (req, res) => {
//     const muestras = await muestra.findAll();
//     res.json(muestras);
// })

// // Petición get para mostrar las muestras en función al id del cassette

// muestraRouter.get("/:id", async (req, res) => {
//     const id_cassette = req.params.id;
//     const muestras = await muestra.findAll({
//         where: {
//             id_cassette: id_cassette
//         }
//     })
//     res.status(200).json(muestras);
// })

// // Petición post para crear una muestra dentro de un determinado cassette.

// muestraRouter.post("/create", async (req, res) => {
//     const muestras = await muestra.create({
//         fecha_muestra: req.body.fecha_muestra,
//         observaciones: req.body.observaciones,
//         descripcion: req.body.descripcion,
//         tincion: req.body.tincion,
//         id_cassette: req.body.id_cassette
//     });
//     res.status(200).json(cassettes);
// });

// // Petición patch para modificar una muestra almacenada en la base de datos.

// muestraRouter.patch("/modificar/:id", (req, res) => {
//     const muestras = muestra.update(
//       {
//         fecha_muestra: req.body.fecha_muestra,	
//         observaciones: req.body.observaciones,	
//         descripcion: req.body.descripcion,	
//         tincion: req.body.tincion,	
//       },
//       {
//         where: {
//           id_muestra: req.params.id,
//         },
//       }
//     );
//     res.json(muestras);
//   });

// // Petición delete para borrar muestras almacenadas en la base de datos.

// muestraRouter.delete("/delete/:id", async(req, res) => {
//     const muestras = await muestra.destroy({
//         where: {
//             id_muestra: req.params.id
//         }
//     })
//     res.status(200).json({ messaage: "Cassette eliminado exitosamente" })
// })

// module.exports = muestraRouter;