const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const process = require('process');
const PORT = process.env.PORT || 3000;
const app = express();
// EJS
app.use(expresslayouts);
app.set('view engine', 'ejs');
// Routes
app.use('/', require('./app/routes/routes'));
app.use('/users', require('./app/routes/routes'));
app.listen(PORT, () => console.log(`server started on ${PORT} port`));