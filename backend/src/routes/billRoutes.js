const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

router.get('/', billController.getAllBills);
router.get('/:id', billController.getBillById);
router.post('/', billController.createBill);
router.delete('/:id', billController.deleteBill);

module.exports = router;
