const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('welcome');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/users/login', (req, res) => {
    res.render('login');
});
module.exports = router; // export pointer on router