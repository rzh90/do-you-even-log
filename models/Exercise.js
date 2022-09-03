const mongoose = require("mongoose")

const ExerciseSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Exercises', ExerciseSchema)