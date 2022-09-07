const mongoose = require("mongoose")

const ExerciseSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Exercises', ExerciseSchema)