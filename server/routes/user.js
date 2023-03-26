const express = require('express');
const app = express()
const router = express.Router();
const userController = require('../controllers/userController');
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require('../passport-config')
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

    
const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))
// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("login.hbs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.hbs")
})
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/homepage")
}
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

router.get('/', userController.view);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);
  
module.exports = router;