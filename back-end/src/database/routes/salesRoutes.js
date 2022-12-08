const { Router } = require('express');
const salesController = require('../controller/Sales.controller')
const { authenticateToken } = require('../../utils/token')


const router = Router();

router.post('/',authenticateToken,salesController.create);
router.get('/',salesController.getAll);
router.patch('/:id',salesController.updateStatus);
router.get('/:id',salesController.getSalesById)

module.exports = router;
