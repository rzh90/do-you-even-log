const Exercise = require("../models/Exercise")

module.exports = {
    getExercises: async(req, res) => {
        console.log(req.user)
        try {
            const exerciseItems = await Exercise.find({userId: req.user.id})
            res.render("workouts.ejs", {exercise: exerciseItems, user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    },

    addExercisePage: async(req, res) => {
        try {
            res.render("add.ejs")
        }
        catch(err) {
            console.error(err)
        }
    },

    addExercise: async(req, res) => {
        try {
            await Exercise.create({
                exercise: req.body.exercise,
                description: req.body.description,
                date: req.body.date,
            })
            console.log(req.body)
            console.log("Exercise has been added")
            res.redirect("/workouts")
        }
        catch(err) {
            console.error(err)
        }
    }
}