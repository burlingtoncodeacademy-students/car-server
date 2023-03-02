const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const validate = async (req, res, next) => {
    console.log("This is your raw token", req.headers.authorization)
    try {
        // Preflight request which checks if the server accepts HTTP methods
        if (req.method === "OPTIONS") {
            next()
            // Place where the token resides within the request
        } else if (req.headers.authorization) {
            // Conditional which prevents token malformation
            // It checks if the token string includes the word 'Bearer' and removes it if needed
            const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
            console.log("Token after our conditional", authToken)

            // JWT verifies token against our secret key and extrapolates the payload
            const payload = authToken ? jwt.verify(authToken, JWT_SECRET_KEY) : undefined
            console.log(payload)

            // If the payload exists and the key is valid, we make the db call to find the user based on the token _id payload
            if (payload) {
                const findUser = await User.findOne({ _id: payload._id })

                if (findUser) {
                    // ! We modify the request mid-cycle to include user info from the database call
                    req.user = findUser
                    // We leave the middlware and allow it to continue to routes
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
        /* 
            Throws raise exceptions and get caught by the catch.
            They console log the error for us AND send a generic status response
            They do however send elaborate error message

            This is in lieu of sending different response for different behavior (see auth.js)
        */
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: `Error ${err.message}`
        })
    }
}

module.exports = validate