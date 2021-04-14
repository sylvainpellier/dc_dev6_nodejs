const express = require('express');
const router = express.Router();

const serviceRechercher = require('../controllers/rechercher');

router.use("/",serviceRechercher.get);

module.exports = router;