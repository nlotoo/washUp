const express = require("express")()
const app = express

const { PORT } = require('./config/config')
router = require('./router')



const expressConfig = require("./config/express");
expressConfig(app)

app.use(router)




express.listen(PORT, () => console.log(`Server listen on port ${PORT}`))