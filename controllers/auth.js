const router = require("express").Router();
const fs = require("fs");
const dbPath = "./db/users.json";
const User = require("../models/User")

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
    const newUser = new User({ name, email, password })
    // Saves the model document into the collection
    await newUser.save()

    res.status(201).json({
      message: `User created`,
      newUser
    })
  } catch (err) {
    res.status(500).json({
      message: `${err}`,
    });
  }
});

// TODO : build a /login controller

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      res.status(404).json({
        message: `User not found`
      })
    } else {
      foundUser.password == password
      ? res.status(200).json({
        message: `User logged in`,
        foundUser
      })
      : res.status(403).json({
        message: `Invalid password`
      })
    }
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
});

module.exports = router;
