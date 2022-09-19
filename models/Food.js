const mongoose = require("mongoose")

const FoodSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    meal: {
        type: String,
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
    },
    protein: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = mongoose.model('Food', FoodSchema)