const express = require('express');
const cors = require('cors');

const loginRoutes = require('../database/routes/loginRoutes');
const registerRoutes = require('../database/routes/registerRoutes');
const productsRoutes = require('../database/routes/productsRoutes');
const salesRoutes = require('../database/routes/salesRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/customer/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
