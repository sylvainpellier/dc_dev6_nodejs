const express = require('express');
const router = express.Router();

const controllerRestaurants = require('../controllers/restaurants');


router.use("/all",controllerRestaurants.getAll);
router.use("/delete/:id",controllerRestaurants.deleteOne);
router.use("/add",controllerRestaurants.add);
router.use("/update/:id",controllerRestaurants.update);
router.use("/update/restaurant/:id",controllerRestaurants.updateAlternative);
router.use("/doUpdateRestaurant/:id",controllerRestaurants.doUpdate);
router.use("/:id",controllerRestaurants.getOne);

module.exports = router;