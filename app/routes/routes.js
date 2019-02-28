const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('welcome');
});
router.get('/register', (req, res) => {
    res.send('Register');
});
module.exports = router; // export pointer on router