const express = require('express');
const app = express();

app.use(require('./heroes'));

module.exports = app;