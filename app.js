const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const process = require('process');
const PORT = process.env.PORT || 3000;
const app = express();
// DB Config
const db = require('./config/keys').MongoURI;
const dbName = 'register_db';
// Connect to Mongo
mongoose.connect(`${db}${dbName}`, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// BodyParser
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', require('./app/routes/routes'));
app.use('/users', require('./app/routes/routes'));
app.listen(PORT, () => console.log(`server started on ${PORT} port`));