# Getting Started

- Create the `package.json` file
  - in the terminal you will use the command `npm init -y`
- install dependencies
  - `npm i express`
  - `npm i nodemon --save -dev
  - `npm i dotenv`
- create a `.gitignore` file
  - add `/node_modules` and `.env`
- create a `.env` file and update your env variables
- update `package.json` main to app.js
  - i.e. ` "main": "app.js"`
  - add `"dev": "nodemon"` to the file

## Boiler Plate for Starting Server

```js
require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`[server] running on ${HOST}:${PORT}`);
});
```

## Preparing our server to handle JSON Objects

In the `app.js` file we need to add this line of code before our first route.

```js
app.use(express.json());
```

## CRUD (Create, Read, Update, Delete)

- Create : POST
- Read : GET
- Update: PUT or PATCH
- Delete : DELETE

## For Routing

For creating a new route you will need to know intended route and start in the `app.js` file

For example:
Route to be built: `http://127.0.0.1:4000/car/create`
<br>
`app.js` will handle the `http://127.0.0.1:4000/car` portion
`routes.js` will handle the `/create`

### Boiler Plate for Creating a NEW Controller

```js
const router = require("express").Router();

module.exports = router;
```

### Basic Controller File Complete - Go To app.js and use the new controller

Add the following to the `app.js`

```js
const carController = require("./controllers/routes");
app.use("/car", carController);
```

NOTE: the `app.use("/car", carController);` needs to go after the `app.use(express.json());`

### Create the final endpoint (barebone) and test it out in Postman

#### Boiler Plate for Creating a New Route on the Controller

```js
router.post("/create", (req, res) => {
  try {
    res.json({ message: "success from /create" });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
```

## ID Generator uuid

- `npm install uuidv4`

# Schema Validation


### Mongoose

An ODM (object data mapper)

- Provides a way for us to connect to our database
- Provides us with methods to CRUD our database
- Provides us with ways to model and schema our data

### Getting Started

- To install mongoose in our car-server:
- ``` npm i mongoose ```
- import ```mongoose``` into our ```app.js``` file
- import our mongo url from the .env file
- instantiate it with the following options:

```js
const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL

mongoose
  .connect(DB_URL, {
    // Changes how it parses the connection string
    useNewUrlParser: true,
    // Deprecates old ability to reconnect to db
    useUnifiedTopology: true
  })
  .then(console.log(`Connected to ${MONGO_URL}`))
  .catch(err => console.log(err))
```

### Schemas

A well-defined document data structure that will be inserted into a collection. It is used to create a model, and based on ```SchemaTypes``` (aka: data types)

### Model

A constructor built out of the data schematic (Schema). It's responsible for all of the CRUD work from respective collection.

