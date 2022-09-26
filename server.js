const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override")
const flash = require("express-flash")
const logger = require("morgan")
const connectDB = require("./config/database")

//Routes
const mainRoutes = require('./routes/main')
const workoutsRoutes = require('./routes/workouts')
const foodRoutes = require('./routes/food')

require('dotenv').config({path: './config/.env'})

//Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"))

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Flashing errors
app.use(flash())

app.use('/', mainRoutes)
app.use('/workouts', workoutsRoutes)
app.use('/food', foodRoutes)

//404 error page
app.get('*', function(req, res){
    res.status(404).redirect("/error");
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
