require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST

const authController = require("./controllers/auth")

app.use(express.json())
app.use("/user", authController)

app.listen(PORT, HOST, () => {
    console.log(`[server] running on ${HOST}:${PORT}`)
})