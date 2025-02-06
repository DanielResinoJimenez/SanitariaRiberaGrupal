const sequelize = require("../db")

const { Model, DataTypes } = require("sequelize")

class User extends Model {}

User.init({
    id_user: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre_user:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_user: {
        type: DataTypes.STRING,
        unique: true,
    },
    password_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['user', 'admin']],  // Solo estos valores son válidos
                msg: "El rol debe ser 'user' o 'admin'"
            }
        }
    }
},{
    sequelize,
    modelName: "usuario",
    tableName: "usuario",
    timestamps: false
})

module.exports = User;