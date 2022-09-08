const Exercise = require("../models/Exercise")

module.exports = {
    getExercises: async(req, res) => {
        try {
            //find all exercises entered by user
            const exerciseItems = await Exercise.find({userId: req.user.id}).sort({date: -1})

            //group array of objects (exercises) by key (date)
            const exerciseByDate = exerciseItems.reduce(function(item, doc) {
                item[doc.date] = item[doc.date] || []
                item[doc.date].push(doc)
                return item
            }, Object.create(null))
            
            //render page with user and exercise items
            res.render("workouts.ejs", {exercise: exerciseByDate, user: req.user})
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
    },

    getEditPage: async(req, res) => {
        try {
            const id = req.params.id
            const exerciseList = await Exercise.find()
            res.render("edit.ejs", {user: req.user, exercises: exerciseList, exerciseId: id})
        }
        catch(err) {
            console.error(err)
        }
    },

    updateExercise: async(req, res) => {
        try {
            const id = req.params.id

            await Exercise.findByIdAndUpdate(id, {
                date: req.body.date,
                exercise: req.body.exercise,
                description: req.body.description
            })
            console.log("Workout has been updated")
            res.redirect("/workouts")
        }
        catch(err) {
            console.error(err)
        }
    },
}