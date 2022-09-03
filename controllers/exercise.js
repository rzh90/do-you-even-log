const Exercise = require("../models/Exercise")

module.exports = {
    getExercises: async(req, res) => {
        console.log(req.user)
        try {
            const exerciseItems = await Exercise.find({userId: req.user.id})
            res.render("exercise.ejs", {exercise: exerciseItems, user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    }
}