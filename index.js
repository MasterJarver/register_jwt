const express = require('express');
const process = require('process');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on ${PORT} port`));