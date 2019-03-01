const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const process = require('process');
const PORT = process.env.PORT || 3000;
const app = express();
// DB Config
const db = require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// BodyParser
app.use(express.urlencoded({extended: false}));
// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Connect Flash
app.use(flash());
// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
// Routes
app.use('/', require('./app/routes/routes'));
app.use('/users', require('./app/routes/routes'));
app.listen(PORT, () => console.log(`server started on ${PORT} port`));