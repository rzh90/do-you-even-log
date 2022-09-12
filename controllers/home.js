const Exercise = require("../models/Exercise")

module.exports = {
    getIndex: (req,res) => {
        res.render('index.ejs')
    },
    
    getDashboard: async(req,res) => {
        try {
            const numOfWorkouts = await Exercise.countDocuments({userId:req.user.id}) //find number of exercises entered by user
            const workoutItems = await Exercise.find({userId: req.user.id}).sort({date: "desc"}).lean() //find all exercises entered by user

            res.render('dashboard.ejs', {user: req.user, workouts: workoutItems, workoutCount: numOfWorkouts})
        }
        catch(err) {
            console.error(err)
        }
    }
}