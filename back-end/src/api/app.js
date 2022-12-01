const express = require('express');
const loginRoutes = require('../database/routes/loginRoutes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoutes);

module.exports = app;
