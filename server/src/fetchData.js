const axios = require('axios');
const { Country } = require('./db.js');

const apiDataClean = (arr) => {
  return arr.map(country => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags.svg,
      continents: country.continents.join(', '),
      capital: country.capital ? country.capital.join(', ') : 'No info',
      subregion: country.subregion ? country.subregion : 'No info',
      area: country.area,
      population: country.population,
    }
  })
}


const fetchDataAndSaveToDB = async () => {
  const empty = await Country.count();
  if(empty === 0) { // La tabla esta vacia, se pueden guardar los datos
    
    //buscar en la api
    const apiCountriesRaw = (await axios.get('http://localhost:5000/countries')).data;
    const apiCountries = apiDataClean(apiCountriesRaw);
    apiCountries.forEach(async (country) => {
      // console.log(country);
      await Country.create(country);
    });
  } else {
    // La tabla no esta vacia
    console.log('Table is not empty');
  }
  
}

module.exports = { fetchDataAndSaveToDB }