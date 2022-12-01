const { Router } = require('express');
const loginController = require('../controller/Login.controller')

const router = Router();

router.post('/', loginController.register);

module.exports = router;