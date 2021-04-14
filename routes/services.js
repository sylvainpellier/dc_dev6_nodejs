const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services');

router.use("/all",servicesController.getAll);
router.use("/:id",servicesController.getOne);


module.exports = router;

