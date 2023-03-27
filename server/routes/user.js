const express = require('express');
const app = express()
const router = express.Router();
const userController = require('../controllers/userController');
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
// const initializePassport = require('../passport-config')
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")


//routes
router.get('/', userController.view);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);
  
module.exports = router;