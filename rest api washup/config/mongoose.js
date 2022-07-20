const mongoose = require('mongoose');
const { DB_PORT } = require("./config.js");

mongoose.connect(`mongodb://localhost:${DB_PORT}/WashUp`,

);

require("../schemes/USER");
//  да си сложа схемите


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB CONNECTED");
});

module.exports = mongoose;