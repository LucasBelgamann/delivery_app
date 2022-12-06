const express = require('express');
const cors = require('cors');

const loginRoutes = require('../database/routes/loginRoutes');
const registerRoutes = require('../database/routes/registerRoutes');
const productsRoutes = require('../database/routes/productsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/customer/products', productsRoutes);

module.exports = app;
