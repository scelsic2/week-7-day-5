const express = require('express');
const PORT = process.env.PORT || 3000;
const db = require("./config/connection");
const api_routes = require("./routes/api_routes")

const app = express();

// you have to use express.json() BEFORE the routes to yet the user access JSON
app.use(express.json());
app.use(express.static('public'));
app.use("/api", api_routes);

// we have to recreate tables if we have recreated relationships
db.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Server is listening on port %s', PORT));    
})
