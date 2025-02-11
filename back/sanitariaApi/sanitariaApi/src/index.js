// Inicializamos todas las variales
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();

// Configuramos cors pata que no de error al hacer las peticiones
app.use(cors({
    origin: 'http://localhost:5500'
  }));

// Concectamos con la base de datos
const sequelize = require("./database/db");

// Importamos las asociaciones para que se generen en nuesta base de datos
require("./database/associations")

// Conversión a json indispensable para el funcionamiento 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos rutas
const apiroutes = require("./routes/apiRouter");

// Ruta para acceder a la base de datos
app.use("/sanitaria", apiroutes);

// Nos conectamos con el puerto.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor conectado al puerto "+PORT);
    sequelize
    .sync({force: false })
    .then(() => console.log("Sincronizado con la base de datos SanitariaRibera"))
})