const { Router } = require('express');
const loginController = require('../controller/Login.controller')

const router = Router();

router.get('/', loginController.getAll);
router.post('/', loginController.login);

module.exports = router;
