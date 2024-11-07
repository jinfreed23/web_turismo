const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/reserva', reservaController.getAllReserva);
router.post('/reserva/update', reservaController.updateReserva);
router.post('/reserva/add', reservaController.addReserva);
router.delete('/reserva/delete/:id', reservaController.deleteReserva);

module.exports = router;