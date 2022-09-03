const express = require("express")
const router = express.Router()
const workoutsController = require("../controllers/workouts")
const { ensureAuth } = require("../middleware/auth")

router.get("/", ensureAuth, workoutsController.getExercises)

module.exports = router