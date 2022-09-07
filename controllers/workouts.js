const Exercise = require("../models/Exercise")

module.exports = {
    getExercises: async(req, res) => {
        try {
            const exerciseItems = await Exercise.find({userId: req.user.id}).sort({date: -1})      
            res.render("workouts.ejs", {exercise: exerciseItems, user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    },

    addExercisePage: async(req, res) => {
        try {
            res.render("add.ejs", {user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    },

    addExercise: async(req, res) => {
        try {
            await Exercise.create({
                date: req.body.date,
                exercise: req.body.exercise,
                description: req.body.description,
                userId: req.user.id
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