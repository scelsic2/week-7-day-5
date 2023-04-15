const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection")
const Book = require("./Book")

class Store extends Model {}

Store.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    location: {
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: "store",
    timestamps: false
});


// instance add book
// If a store had many books but a book only had one store
// Store.hasMany(Book)

// If a book had one store and a store had 1 book
// Book.hasOne(Store);

//through is pivot table name
Book.belongsToMany(Store, {through: "store_book"});

module.exports = Store;