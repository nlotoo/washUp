const { JWT_SECRET } = require('../config/config.js')
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {


    console.log('i`m in middleware')

    // let token = req.headers['Session Token'];

    // if (token) {
    //     jwt.verify(token, JWT_SECRET, function(err, decoded) {
    //         if (err) {
    //             res.locals.user = ""
    //             return;
    //         }

    //         res.locals.user = decoded
    //     });
    // }

    next();
}