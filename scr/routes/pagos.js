const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.get('/pagos', pagoController.getAllPagos);
router.post('/pagos/update', pagoController.updatePago);
router.post('/pagos/add', pagoController.addPago);
router.delete('/pagos/delete/:id', pagoController.deletePago);

module.exports = router;
