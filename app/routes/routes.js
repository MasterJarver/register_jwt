const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
router.get('/', (req, res) => {
    res.render('welcome');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/users/login', (req, res) => {
    res.render('login');
});
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];
    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }
    // Check password match
    if(password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }
    if(password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'})
    }
    if(errors.length > 0) {
        res.render('register', {errors, name, email, password, password2});
    }
    else {
        // Validation passed
        User.findOne({email: email})
            .then(user => {
                if(user) {
                    // user exists
                    error.push({msg: 'Email is already registered'});
                    res.render('register', {errors, name, email, password, password2});
                }
                else {
                    const newUser = new User({name, email, password});
                    console.log(newUser);
                    res.send('hello');
                }
            });
    }
});
module.exports = router; // export pointer on router