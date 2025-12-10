const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.getAllTables);
router.get('/available', tableController.getAvailableTables);
router.get('/:id', tableController.getTableById);
router.post('/', tableController.createTable);
router.put('/:id', tableController.updateTable);
router.patch('/:id/status', tableController.updateTableStatus);
router.delete('/:id', tableController.deleteTable);

module.exports = router;
