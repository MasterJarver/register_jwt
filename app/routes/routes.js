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
router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('hello');
});
module.exports = router; // export pointer on router