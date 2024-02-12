const { getAllCountries, getCountryById, searchCountryByName } = require('../controllers/countryControllers.js')

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  
  try {
    const result = name ? await searchCountryByName(name) : await getAllCountries();
    
    if(result.length === 0) {
      res.json({ message: "No countries found with the specified name"})
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getCountryByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await getCountryById(id);
    res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { getCountriesHandler, getCountryByIdHandler }