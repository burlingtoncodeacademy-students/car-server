const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const validate = async (req, res, next) => {
    console.log("This is your raw token", req.headers.authorization)
    try {
        if (req.method === "OPTIONS") {
            next()
        } else if (req.headers.authorization) {
            const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
            console.log("Token after our conditional", authToken)

            const payload = authToken ? jwt.verify(authToken, JWT_SECRET_KEY) : undefined
            console.log(payload)

            if (payload) {
                const findUser = await User.findOne({ _id: payload._id })

                if (findUser) {
                    req.user = findUser
                    next()
                } else {
                    throw new Error("User not found")
                }
            } else {
                throw new Error("Invalid token")
            }
        } else {
            throw new Error("Forbidden")
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: `Error ${err.message}`
        })
    }
}

module.exports = validate