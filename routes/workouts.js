const express = require("express")
const router = express.Router()
const workoutsController = require("../controllers/workouts")
const { ensureAuth } = require("../middleware/auth")

router.get("/", ensureAuth, workoutsController.getExercises)

router.get("/add", workoutsController.addExercisePage)
router.post("/add-exercise", workoutsController.addExercise)

module.exports = router