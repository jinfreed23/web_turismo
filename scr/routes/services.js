const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.get('/servicios', servicesController.getAllServicios);
router.post('/servicios/add', servicesController.addServicio);
router.post('/servicios/update', servicesController.updateServicio);
router.delete('/servicios/delete/:id', servicesController.deleteServicio);

module.exports = router;
