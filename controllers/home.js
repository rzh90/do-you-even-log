const Exercise = require("../models/Exercise")

module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs')
    },
    
    getDashboard: async(req, res) => {
        try {
            const numOfExercises = await Exercise.countDocuments({userId:req.user.id}) //find number of exercises entered by user
            const exerciseItems = await Exercise.find({userId: req.user.id}).sort({date: "desc"}).lean() //find all exercises entered by user
            const exerciseByDate = exerciseItems.reduce(function(item, doc) { //group array of objects (exercises) by key (date)
                item[doc.date] = item[doc.date] || []
                item[doc.date].push(doc)
                return item
            }, Object.create(null))
            
            //render page with user and exercise items
            res.render('dashboard.ejs', {user: req.user, exercises: exerciseItems, exerciseCount: numOfExercises, exerciseDates: exerciseByDate})
        }
        catch(err) {
            console.error(err)
        }
    }
}