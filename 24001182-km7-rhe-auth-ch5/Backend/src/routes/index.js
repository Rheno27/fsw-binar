const express = require('express');

const routesType = require('./routeType');
const routesManufacture = require('./routeManufacture');
const routesModel = require('./routeModel');
const routesCars = require('./carsRoutes');
const routesCarSpecs = require('./carspecsRoutes');
const routesSpecs = require('./specsRoutes');
const routeOptions = require('./routeOptions');
const routeCarOptions = require('./routeCarOptions');
const routeTransmission = require('./routeTransmission');
const routeAuth = require('./auth');
const router = express.Router();

router.use('/auth', routeAuth);
router.use('/cars', routesCars);

router.use('/type', routesType);
router.use('/manufacture', routesManufacture);
router.use('/model', routesModel);

router.use('/carspecs', routesCarSpecs);
router.use('/specs', routesSpecs);

router.use('/options', routeOptions);
router.use('/caroptions', routeCarOptions);
router.use('/transmission', routeTransmission);

module.exports = router;
