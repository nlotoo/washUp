const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')
module.exports = (req, res, next) => {



    let token = req.headers.token
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if (err) {
            res.locals.user = ''
            return
        }
        res.locals.user = decoded

    })

    if (!res.locals.user) {
        res.status(401).json({ message: "You`re not authorizattion" })

        return
    }



    // if (res.locals.user) {
    //     console.log(res.locals.user)


    //     res.status(401).json({ message: "Unauthorized" });
    //     return
    // }

    next();
}