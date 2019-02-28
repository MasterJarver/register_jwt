const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('main page');
});
module.exports = router // export pointer on router