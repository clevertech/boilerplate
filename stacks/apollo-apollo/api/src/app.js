const express = require('express');
const app = express();

const passportAuth = require('./middleware/passportAuth')

app.use('/graphql', passportAuth)

module.exports = app;
