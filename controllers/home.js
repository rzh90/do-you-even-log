const Exercise = require("../models/Exercise")
const Food = require("../models/Food")

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    },

    getAbout: (req, res) => {
        res.render('main/about.ejs')
    },
    
    getDashboard: async(req, res) => {
        try {
            const numOfExercises = await Exercise.countDocuments({userId:req.user.id}) //find number of exercises entered by user

            //find all exercises added by current user
            //group by date, push records
            //sort by date in descending order
            const exerciseByDate = await Exercise.aggregate([
                { $match: { 'userId' : req.user.id } },
                { $group: {_id: '$date', records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])

            const numOfFood = await Food.countDocuments({userId:req.user.id}) //find number of exercises entered by user

            //find all exercises added by current user
            //group by date, push records
            //sort by date in descending order
            const foodByDate = await Food.aggregate([
                { $match: { 'userId' : req.user.id } },
                { $group: {_id: '$date', records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])
            
            //render page with user and exercise items
            res.render('main/dashboard.ejs', {user: req.user, exerciseCount: numOfExercises, exerciseDates: exerciseByDate, foodCount: numOfFood, foodDates: foodByDate})
        }
        catch(err) {
            console.error(err)
        }
    }
}