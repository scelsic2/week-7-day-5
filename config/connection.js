const { Sequelize } = require('sequelize');
console.log(process.env.USERNAME, process.env.PASSWORD, process.env.DATABASE);
require("dotenv")

const connection = new Sequelize(
    "bookstore_db",
    "root",
    "password", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;