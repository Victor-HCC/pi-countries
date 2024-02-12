const { Router } = require("express");
// importamos los routers
const countriesRouter = require('./countriesRouter.js');
const activitiesRouter = require('./activitiesRouter.js');

const router = Router();

//configuramos las rutas para sus respectivos routers
router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
