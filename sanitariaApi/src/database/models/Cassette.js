const sequelize = require("../db")
const { Model, DataTypes } = require("sequelize");

class Cassette extends Model { }

// DEFINICION DE ATRIBUTOS DE LA ENTIDAD
// CARACTERISTICAS Y OBSERVACIONES CAMPOS NO REQUERIDOS

Cassette.init({
    id_cassette: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.TEXT('medium'),
    },
    descripcion: {
        type: DataTypes.TEXT('medium'),
    },
    caracteristicas: {
        type: DataTypes.TEXT('medium'),
    },
    organo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuario",
            key: "id_user"
        },
        onDelete: "CASCADE"
    }
}, {
    sequelize,
    modelName: "cassette",
    tableName: "cassette",
    timestamps: false
})

// EXPORTACION DEL MODULO

module.exports = Cassette;