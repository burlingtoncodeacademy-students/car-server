const router = require("express").Router();
const Car = require("../models/Car")

// Create an endpoint that has a POST method
// The full url for this endpoint is : http://127.0.0.1:4000/car/create
router.post("/create", async (req, res) => {
  try {
    const carIncoming = req.body
    
    const newCar = new Car(carIncoming)

    newCar.save()

    res.status(201).json({
      message: `Car saved`,
      newCar
    })
    
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
    
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Create an endpoint that has a GET method to find one car by query id
// The full url for this endpoint is: http://127.0.0.1:4000/car/getone/:id
router.get("/getone/", (req, res) => {
    try {
      
    } catch (err) {
        res.status(500).json({
            message: `Error: ${err}`
        })
    }
})

// Create an endpoint that has a DELETE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/delete/:id

router.delete("/delete/:id", (req, res) => {
  try {
   
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
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create an endpoint that has a GET method
// The full url for this endpoint is : http://127.0.0.1:4000/car/get/:id

module.exports = router;
