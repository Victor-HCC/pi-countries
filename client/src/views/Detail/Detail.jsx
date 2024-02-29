import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css';
import { getCountryById } from '../../redux/countriesSlicer'

function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector(state => state.countries.countryById);

  useEffect(() => {
    dispatch(getCountryById(id))
  }, [dispatch, id])

  if (country.length === 0) {
    return <div>Loading...</div>; // Render a loading message until data is available
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h2>Country Details</h2>
        <p>ID: {id}</p>
        <p>Name: {country.name}</p>
        <img width={100} src={country.flag} alt={`Image flag ${country.name}`} />
        <p>Continent: {country.continents}</p>
        <p>Capital: {country.capital}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Area: {country.area} km²</p>
        <p>Population: {country.population}</p>
        <p>Activities: {country.Activities.map(activity => activity.name).join(', ') || 'No info'}</p>
      </div>
    </div>
  )
}

export default Detail
