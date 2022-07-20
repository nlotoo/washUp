const express = require("express");
const cors = require("cors");


module.exports = (app) => {
    app.use(cors());

    require("./mongoose");
    app.use(express.json());

}