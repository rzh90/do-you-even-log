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

    //show add page with username
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
            //add document based on form input
            await Exercise.create({
                date: req.body.date,
                exercise: req.body.exercise,
                description: req.body.description,
                userId: req.user.id
            })

            //send user back to workouts page
            res.redirect("/workouts")
        }
        catch(err) {
            console.error(err)
        }
    },

    getEditPage: async(req, res) => {
        try {
            //get exercise list and request id
            const id = req.params.id
            const exerciseList = await Exercise.find()

            //send above info to edit page
            res.render("edit.ejs", {user: req.user, exercises: exerciseList, exerciseId: id})
        }
        catch(err) {
            console.error(err)
        }
    },

    updateExercise: async(req, res) => {
        try {
            //id of document
            const id = req.params.id

            //create new document based on form inputs
            await Exercise.findByIdAndUpdate(id, {
                date: req.body.date,
                exercise: req.body.exercise,
                description: req.body.description
            })

            //send user back to workouts page
            res.redirect("/workouts")
        }
        catch(err) {
            console.error(err)
        }
    },

    deleteExercise: async(req, res) => {
        try {
            //delete document with the id
            await Exercise.remove({ _id: req.params.id })
            
            //send user back to workouts page
            res.redirect("/workouts")
        }
        catch(err) {
            res.redirect("/workouts")
        }
    }
}