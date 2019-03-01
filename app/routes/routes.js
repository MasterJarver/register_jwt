const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../../config/auth');
// Welcome page
router.get('/', (req, res) => {
    res.render('welcome');
});
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {name: req.user.name}));
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
                    console.log('user already exist');
                    errors.push({msg: 'Email is already registered'});
                    res.render('register', {errors, name, email, password, password2});
                }
                else {
                    console.log('create new user');
                    const newUser = new User({name, email, password});
                    // hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // Set password to hashed
                            newUser.password = hash;
                            console.log(`hash is ${hash}`);
                            console.log(`new user password is ${newUser.password}`);
                            console.log('hash was created');
                        });
                    });
                    setTimeout(() => {
                        newUser.save()
                            .then((user) => {
                                console.log('prepare to save user');
                                console.log('user saved', user);
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                        console.log('this is new user: \n' + newUser);
                    }, 100);
                }
            })
            .catch(err => console.log(err));
    }
});
// Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');

});
module.exports = router; // export pointer on router