const mongoose = require("mongoose")
const Exercise = require("../models/Exercise")
const Food = require("../models/Food")

module.exports = {
    //main page
    getIndex: (req, res) => {
        res.render('index.ejs')
    },

    //about
    getAbout: (req, res) => {
        res.render('main/about.ejs')
    },

    //error
    getError: (req, res) => {
        res.render('error.ejs')
    },
    
    //dashboard
    getDashboard: async(req, res) => {
        try {
            //WORKOUTS
            const numOfExercises = await Exercise.countDocuments({userId:req.user.id}) //find number of exercises entered by user

            //find all exercises added by current user
            //group by date, push records
            //sort by date in descending order
            const exerciseByDate = await Exercise.aggregate([
                { $match: { 'userId' : new mongoose.Types.ObjectId(req.user.id) } },
                { $group: {_id: '$date', records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])


            //FOOD
            const numOfFood = await Food.countDocuments({userId:req.user.id}) //find number of foods entered by user

            //find all exercises added by current user
            //group by date, push records
            //sort by date in descending order
            const foodByDate = await Food.aggregate([
                { $match: { 'userId' : new mongoose.Types.ObjectId(req.user.id) } },
                { $group: {_id: '$date', records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])
            
            //render dashboard page with user, exercise items, and food items
            res.render('main/dashboard.ejs', {user: req.user, exerciseCount: numOfExercises, exerciseDates: exerciseByDate, foodCount: numOfFood, foodDates: foodByDate})
        }
        catch(err) {
            console.error(err)
        }
    }
}