const mongoose = require("mongoose")

const Car = new mongoose.Schema(
    {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        vin: {
            type: String,
            required: true,
        },
        drivetrain: {
            type: String,
            required: true,
        },
        fuel: {
            type: String,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        engine: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("cars", Car)