const { Router } = require('express');
const activitiesRouter = Router();

const { createActivityHandler, getActivitiesHandler } = require('../handlers/activitiesHandlers.js');

activitiesRouter.post('/', createActivityHandler);
activitiesRouter.get('/', getActivitiesHandler);

module.exports = activitiesRouter;