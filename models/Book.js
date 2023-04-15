const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection")

class Book extends Model {}

Book.init({
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    author: {
        type:DataTypes.STRING,
        allowNull: false
    },
    in_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize: db,
    modelName: "book",
    timestamps: false
});

module.exports = Book;