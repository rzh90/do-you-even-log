const mongoose = require("mongoose")
const Exercise = require("../models/Exercise")

module.exports = {
    getExercises: async(req, res) => {
        try {
            //find all exercises added by current user
            //group by date, push records
            //sort by date in descending order
            const exerciseByDate = await Exercise.aggregate([
                { $match: { 'userId' : new mongoose.Types.ObjectId(req.user.id) } },
                { $group: {_id: '$date', records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])

            //render page with user and exercise items
            res.render("workouts/workouts.ejs", {exercises: exerciseByDate, user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    },

    //show add page with username
    addExercisePage: async(req, res) => {
        try {
            res.render("workouts/add.ejs", {user: req.user})
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
            const validationErrors = []
            if(req.body.date == "") validationErrors.push({ msg: "Please enter a date" })
            if(req.body.exercise == "") validationErrors.push({ msg: "Please enter an exercise" })
            if(req.body.description == "") validationErrors.push({ msg: "Please enter a description" })

            if(validationErrors.length) {
                req.flash("errors", validationErrors)
                return res.redirect("/workouts/add")
            }
        }
    },

    getEditPage: async(req, res) => {
        try {
            //get exercise list and request id
            const id = req.params.id
            const exerciseList = await Exercise.find()

            //send above info to edit page
            res.render("workouts/edit.ejs", {user: req.user, exercises: exerciseList, exerciseId: id})
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
    },

    getPlateCalculator: (req, res) => {
        res.render('workouts/plate-calculator.ejs')
    },

    getRestTimer: (req, res) => {
        res.render('workouts/rest-timer.ejs')
    },
}