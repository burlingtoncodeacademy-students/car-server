const router = require("express").Router();
const fs = require("fs");
const { v4: uuid_v4 } = require("uuid");
const dbPath = "./db/cars.json";

// Create an endpoint that has a POST method
// The full url for this endpoint is : http://127.0.0.1:4000/car/create
router.post("/create", (req, res) => {
  try {
    // generates an ID for us
    const id = uuid_v4();
    // reads the current cars JSON file
    let cars = read();
    // destructuring the body in the request
    const { make, model, mileage, color } = req.body;
    // packaging up the cars object to be inserted in the array
    const data = { id, make, model, mileage, color };
    // appending our data to the array before saving
    cars.push(data);
    // conducting a file system write and verifying it did save
    const isSaved = save(cars);

    if (!isSaved) {
      throw Error("car not saved");
    }

    res.json({ message: "success from /create" });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Create an endpoint that has a GET method
// The full url for this endpoint is : http://127.0.0.1:4000/car/getall
router.get("/getall", (req, res) => {
  try {
    const cars = read();
    res.json({ cars, message: "success from /getall" });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Create an endpoint that has a DELETE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/delete/:id

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    //  TODO: See if the ID exists
    const carFound = findById(id);
    const isCarFound = carFound.length > 0 ? true : false;

    if (!isCarFound) {
      throw Error("car not found");
    }

    // TODO: Remove the car
    const cars = read();
    const filteredCars = cars.filter((car) => car.id !== id);

    // TODO: Save the filered cars

    save(filteredCars);
    res.json({ message: "success from /delete", recordDeleted: carFound[0] });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create an endpoint that has a UPDATE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/update/:id

router.put("/update/:id", (req, res) => {
  try {
    const id = req.params.id;
    const carFound = findById(id);
    const isCarFound = carFound.length > 0 ? true : false;

    if (!isCarFound) {
      throw Error("car not found");
    }

    let cars = read();
    let carIndex = cars.findIndex((car) => car.id === id);

    cars[carIndex].make = req.body.make ?? cars[carIndex].make;
    cars[carIndex].model = req.body.model ?? cars[carIndex].model;
    cars[carIndex].mileage = req.body.mileage ?? cars[carIndex].mileage;
    cars[carIndex].color = req.body.color ?? cars[carIndex].color;

    save(cars);

    res.json({ message: "success from /update" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create an endpoint that has a GET method
// The full url for this endpoint is : http://127.0.0.1:4000/car/get/:id

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

function findById(id) {
  const cars = read();
  const filteredCars = cars.filter((car) => car.id === id);
  return filteredCars;
}

module.exports = router;
