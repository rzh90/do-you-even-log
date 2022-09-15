const Food = require("../models/Food")

module.exports = {
    getFood: async(req, res) => {
        try {
            /* //find all food entered by user
            const foodItems = await Food.find({userId: req.user.id}).sort({date: "desc"}).lean()

            //group array of objects (food) by key (date)
            const foodByDate = foodItems.reduce(function(item, doc) {
                item[doc.date] = item[doc.date] || []
                item[doc.date].push(doc)
                return item
            }, Object.create(null))

            console.log(foodByDate)
            
            //render page with user and food items
            res.render("food.ejs", {food: foodByDate, user: req.user}) */
            const foodByDate = await Food.aggregate([
                { $match: { 'userId' : req.user.id } },
                //{ $group: {_id: {date: '$date', meal: '$meal'}, records: { $push: "$$ROOT"}} },
                { $group: {_id: '$date', totalCals: {$sum: "$calories"}, records: { $push: "$$ROOT"}} },
                { $sort: {_id: -1} },
            ])

            //console.log(foodByDate[0]['records'][0]['date'])
            console.log(foodByDate)

            res.render("food.ejs", {food: foodByDate, user: req.user})
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
                userId: req.user.id
            })

            //send user back to workouts page
            res.redirect("/food")
        }
        catch(err) {
            console.error(err)
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
                calories: req.body.calories
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
            
            //send user back to workouts page
            res.redirect("/food")
        }
        catch(err) {
            res.redirect("/food")
        }
    } 
}