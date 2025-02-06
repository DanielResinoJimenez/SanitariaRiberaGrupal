const User = require("./models/User");
const Cassette = require("./models/Cassette");
const Muestra = require("./models/Muestra");
const Imagen = require("./models/Imagen");

// Relación User Crea Cassete 1:N

User.hasMany(Cassette, { foreignKey: 'id_user'});
Cassette.belongsTo(User, { foreignKey: 'id_user'});

// Relación Cassette tiene Muestra 1:N

Cassette.hasMany(Muestra, { foreignKey: 'id_cassette'});
Muestra.belongsTo(Cassette, { foreignKey: 'id_cassette'});

// Relación Muestra tiene Imagen 1:N

Muestra.hasMany(Imagen, { foreignKey: 'id_muestra'});
Imagen.belongsTo(Muestra, { foreignKey: 'id_muestra'});