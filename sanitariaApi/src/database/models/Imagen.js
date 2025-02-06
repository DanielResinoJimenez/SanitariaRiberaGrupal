const sequelize = require("../db")
const { Model, DataTypes } = require("sequelize");

class Imagen extends Model { }

Imagen.init({
    id_imagen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    imagen: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "imagen"
})

module.exports = Imagen;