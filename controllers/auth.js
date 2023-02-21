const router = require("express").Router()

// TODO: build a /register controllers
let userDB = []

router.post("/register", (req, res) => {
    let { name, email, password } = req.body
    try {
        userDB.push({ name, email, password })
        console.log(userDB)
        res.status(201).json({
            message: `User created`,
        })
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// TODO : build a /login controller

router.post("/login", (req, res) => {
    console.log("login route hit")
})

module.exports = router