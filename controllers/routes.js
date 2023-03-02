const router = require("express").Router();
const Car = require("../models/Car");

// Create an endpoint that has a POST method
// The full url for this endpoint is : http://127.0.0.1:4000/car/create
router.post("/create", async (req, res) => {
  try {
    const carIncoming = req.body;

    const newCar = new Car(carIncoming);

    newCar.save();

    res.status(201).json({
      message: `Car saved`,
      newCar,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Create an endpoint that has a GET method
// The full url for this endpoint is : http://127.0.0.1:4000/car/getall
router.get("/getall", async (req, res) => {
  try {
    const findAll = await Car.find({});
    res.status(200).json(findAll);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Create an endpoint that has a GET method to find one car by id
// The full url for this endpoint is: http://127.0.0.1:4000/car/getone/:id
router.get("/getone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findItem = await Car.findById(id);
    res.status(200).json(findItem);
  } catch (err) {
    res.status(500).json({
      message: `Error: ${err}`,
    });
  }
});

// Create an endpoint that has a DELETE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/delete/:id

router.delete("/delete/:id", async (req, res) => {
  try {
    // Object Destructuring
    const { id } = req.params;
    // same as const id = req.params.id
    
    const findItem = await Car.findByIdAndDelete(id);
    
    if (!findItem) {
      throw new Error(`Provided id: ${id} does not exist`)
    } else {
      res.status(200).json({
        message: `Car successfully deleted`,
        findItem
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create an endpoint that has a UPDATE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/update/:id

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params
    const newCar = req.body

    const updatedItem = await Car.updateOne(
      { _id: id },
      { $set: newCar }
    )

    res.status(200).json({
      message: `Car successfully updated`,
      updatedItem
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create an endpoint that has a GET method
// The full url for this endpoint is : http://127.0.0.1:4000/car/get/:id

module.exports = router;
