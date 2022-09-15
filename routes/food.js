const express = require("express")
const router = express.Router()
const foodController = require("../controllers/food")
const { ensureAuth } = require("../middleware/auth")

//READ
router.get("/", ensureAuth, foodController.getFood)     //page with list of food

//CREATE
router.get("/add", foodController.addFoodPage)          //add an exercise
router.post("/add-food", foodController.addFood)        //process the submitted form


//UPDATE
router.get("/edit/:id", foodController.getEditPage)     //edit an exercise
router.post("/edit/:id", foodController.updateFood)   //process the submitted form

//DELETE
router.delete("/delete/:id", foodController.deleteFood)

module.exports = router