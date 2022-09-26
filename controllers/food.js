const mongoose = require("mongoose")
const Food = require("../models/Food")

module.exports = {
    getFood: async(req, res) => {
        try {
            //find all foods created by current user
            //group by date, sum total calories and protein, push records
            //sort by date in descending order
            const foodByDate = await Food.aggregate([
                { $match: { 'userId' : new mongoose.Types.ObjectId(req.user.id) } },
                { $group: {_id: '$date', totalCals: {$sum: "$calories"}, totalProtein: {$sum: "$protein"}, records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])

            //render Food page with foods sorted by date and username
            res.render("food/food.ejs", {foods: foodByDate, user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    },

    //show add page with username
    addFoodPage: async(req, res) => {
        try {
            res.render("food/add.ejs", {user: req.user})
        }
        catch(err) {
            console.error(err)
        }
    },

    addFood: async(req, res) => {
        try {
            //add document based on form input
            await Food.create({
                date: req.body.date,
                meal: req.body.meal,
                food: req.body.food,
                calories: req.body.calories,
                protein: req.body.protein,
                userId: req.user.id
            })

            //send user back to workouts page
            res.redirect("/food")
        }
        catch(err) {
            const validationErrors = []
            if(req.body.date == "") validationErrors.push({ msg: "Please enter a date" })
            if(req.body.meal == "") validationErrors.push({ msg: "Please select a meal" })
            if(req.body.food == "") validationErrors.push({ msg: "Please enter a food" })

            if(validationErrors.length) {
                req.flash("errors", validationErrors)
                return res.redirect("/food/add")
            }
        }
    },

    getEditPage: async(req, res) => {
        try {
            //get food list and request id
            const id = req.params.id
            const foodList = await Food.find()

            //send above info to edit page
            res.render("food/edit.ejs", {user: req.user, foods: foodList, foodId: id})
        }
        catch(err) {
            console.error(err)
        }
    },

    updateFood: async(req, res) => {
        try {
            //id of document
            const id = req.params.id

            //create new document based on form inputs
            await Food.findByIdAndUpdate(id, {
                date: req.body.date,
                meal: req.body.meal,
                food: req.body.food,
                calories: req.body.calories,
                protein: req.body.protein,
            })

            //send user back to food page
            res.redirect("/food")
        }
        catch(err) {
            console.error(err)
        }
    },

    deleteFood: async(req, res) => {
        try {
            //delete document with the id
            await Food.remove({ _id: req.params.id })
            
            //send user back to food page
            res.redirect("/food")
        }
        catch(err) {
            res.redirect("/food")
        }
    } 
}