const { Router } = require("express");
const router = Router();


const authControler = require('./routeControler/authControler.js')

// router.use('/', authControler)
// router.use('/home', authControler)

router.use('/', authControler)


module.exports = router