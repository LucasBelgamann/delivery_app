const { Router } = require('express');
const productsController = require('../controller/Products.controller')

const router = Router();

router.get('/', productsController.getAllProducts);

module.exports = router;
