const router = require("express").Router();
const fs = require("fs");
const dbPath = "./db/users.json";
// TODO: build a /register controllers
// let userDB = [
//   { name: "Tyler", email: "tylermalone@me.com", password: "Malone55" },
// ];

router.post("/register", (req, res) => {
  try {
    let { name, email, password } = req.body;
    // TODO: grab a current snapshot of the database
    let userDB = read();
    // TODO: check to see if the user exists
    let userExistArray = userDB.filter((user) => user.email === email);
    if (userExistArray.length > 0) {
      throw Error("Email already exisits");
    }

    // TODO: add the new user to the snapshot
    userDB.push({ name, email, password });

    // TODO: save the new snapshot to rewrite the file.
    const isSaved = save(userDB);
    console.log(userDB);
    // TODO: What if isSaved is false?
    res.status(201).json({
      message: isSaved === true ? `User created` : "We had a problem",
    });
  } catch (err) {
    res.status(500).json({
      message: `${err}`,
    });
  }
});

// TODO : build a /login controller

router.post("/login", (req, res) => {
  console.log("login route hit");
  try {
    let { email, password } = req.body;
    let userDB = read();
    // TODO: Check to see if the user exists
    let userLogin = userDB.filter((user) => user.email === email);
    console.log(userLogin);
    // ! Checking to see if we have a user match
    if (userLogin.length === 0) {
      throw Error("user does not exisit");
    }
    // ! Passwords do not match
    if (userLogin[0].password !== password) {
      throw Error("user password does not match");
    }

    res.status(200).json({
      message: "login success",
    });
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
});

function read() {
  const file = fs.readFileSync(dbPath);
  //   Converts a JSON object to object literal
  const fileObj = JSON.parse(file);
  return fileObj;
}

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
      return false;
    }
  });
  return true;
}

module.exports = router;
