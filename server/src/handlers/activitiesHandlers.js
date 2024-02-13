const { createActivity, getAllActivities } = require('../controllers/activityControllers.js');
const { retrieveCountry } = require('../controllers/countryControllers.js')

const createActivityHandler = async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  
  try {
    const newActivity = await createActivity(name, difficulty, duration, season); //crea una activity en la db
    const countryRecords = await Promise.all(country.map(countryName => retrieveCountry(countryName))); //obtiene los countries de la db

    await newActivity.addCountries(countryRecords); //crea la relacion de la actividad con los paises

    res.status(200).json(newActivity)
  } catch (error) {
    res.status(400).json({ error: error.messagee})
  }
}

const getActivitiesHandler = async (req, res) => {
  try {
    const result = await getAllActivities();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { createActivityHandler, getActivitiesHandler }