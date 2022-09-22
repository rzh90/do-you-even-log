const express = require("express")
const router = express.Router()
const workoutsController = require("../controllers/workouts")
const { ensureAuth } = require("../middleware/auth")

//READ
router.get("/", ensureAuth, workoutsController.getExercises)                            //page with list of workouts
router.get("/plate-calculator", ensureAuth, workoutsController.getPlateCalculator)      //plate calculator
router.get("/rest-timer", ensureAuth, workoutsController.getRestTimer)                  //rest timer

//CREATE
router.get("/add", workoutsController.addExercisePage)                                  //add an exercise
router.post("/add-exercise", workoutsController.addExercise)                            //process the submitted form

//UPDATE
router.get("/edit/:id", workoutsController.getEditPage)                                 //edit an exercise
router.post("/edit/:id", workoutsController.updateExercise)                             //process the submitted form

//DELETE
router.delete("/delete/:id", workoutsController.deleteExercise)                         //delete an exercise

module.exports = router