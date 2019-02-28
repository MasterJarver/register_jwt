const express = require('express');
const process = require('process');
const PORT = process.env.PORT || 3000;
const app = express();
app.use('/', require('./app/routes/routes'));
app.use('/users', require('./app/routes/routes'));
app.listen(PORT, () => console.log(`server started on ${PORT} port`));