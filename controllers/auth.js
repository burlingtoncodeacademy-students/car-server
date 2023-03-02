const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SALT = Number(process.env.SALT)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Checks if user entered all required values
    if (!name, !email, !password) {
      throw new Error("The user has provided undefined schema values")
      res.status(406).json({
        message: `Invalid schema`
      })
    }
    
    // Instantiates a new model instance with provided object values
    const newUser = new User({ name, email, password: bcrypt.hashSync(password, SALT) })
    // Saves the model document into the collection
    await newUser.save()

    const token = jwt.sign(
      // payload
      { _id: newUser._id },
      // secret key
      JWT_SECRET_KEY,
      { expiresIn: 60 * 60 * 24 }
    )

    res.status(201).json({
      message: `User created`,
      newUser,
      token
    })
  } catch (err) {
    res.status(500).json({
      message: `${err}`,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      res.status(404).json({
        message: `User not found`
      })
    } else {
      const verifyPwd = await bcrypt.compare(password, foundUser.password)
      if (verifyPwd) {
        const token = jwt.sign(
          { _id: foundUser._id },
          JWT_SECRET_KEY,
          { expiresIn: "24h" }
        )

        res.status(200).json({
          message: `User logged in`,
          foundUser,
          token
        })
      } else {
        res.status(403).json({
          message: `Invalid password`
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
});

module.exports = router;
