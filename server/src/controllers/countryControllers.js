const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');

const getAllCountries = async () => {
  const countries = await Country.findAll({
    include: [
      {
        model: Activity,
        attributes: ["name"],
        through: { attributes: [] }
      }
    ]
  });

  const countriesWithActivityNames = countries.map(country => {
    return {
      ...country.toJSON(),
      Activities: country.Activities.map(activity => activity.name)
    };
  });

  return countriesWithActivityNames;
}

const getCountryById = async (id) => {
  const country = Country.findByPk(id,{
    include: [
      {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: []}
      }
    ]
  })

  return country;
}

// const searchCountryByName = async (name) => {
//   const countries = await Country.findAll({
//     where: {
//       name: name
//     }
//   })
//   return countries;
// }

const searchCountryByName = async (name) => {
  const countries = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    }
  })
  return countries;
}

const retrieveCountry = async (country) => {
  
  const existingCountry = await Country.findOne({ where: { name: country } });

  return existingCountry;
}


module.exports = { getAllCountries, getCountryById, searchCountryByName, retrieveCountry }