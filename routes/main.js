const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//main page
router.get('/', homeController.getIndex)

//about page
router.get('/about', homeController.getAbout)

//log in
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

//log out
router.get('/logout', authController.logout)

//create account
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

//send logged in user to dashboard
router.get('/dashboard', ensureAuth, homeController.getDashboard)

module.exports = router