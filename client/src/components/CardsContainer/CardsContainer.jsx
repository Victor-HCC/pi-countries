import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/countriesSlicer";
import { useEffect } from "react";
import Card from "../Card/Card";
import styles from './CardsContainer.module.css';
import PropTypes from 'prop-types';

const CardsContainer = ({ currentPage, /*setCurrentPage*/ onPageChange, filters, countriesByName }) => {
  const dispatch = useDispatch();
  let countriesData = useSelector(state => state.countries.data);
  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  // const { searchName,
  //   sortByName,
  //   sortByPopulation,
  //   continentFilter,
  //   activityFilter } = filters

  let content;
  
  let countries = countriesData.slice(); //copy of the countries array
  
  if(countriesByName.message) {
    content = <p className={styles.messageSearch}>{countriesByName.message}</p>;
  } else if(countriesByName.length > 0) {
    countries = countriesByName
  }
  

  //sorting a-z
  if (filters.sortByName === 'alpha-ascending') {
    countries.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sortByName === 'alpha-descending') {
    countries.sort((a, b) => b.name.localeCompare(a.name));
  }

  //sorting population
  if (filters.sortByPopulation === 'minmax') {
    countries.sort((a, b) => a.population - b.population);
  } else if (filters.sortByPopulation === 'maxmin') {
    countries.sort((a, b) => b.population - a.population);
  }

  //filtering on continent
  if (filters.continentFilter) {
    countries = countries.filter(country => country.continents === filters.continentFilter);
  }

  //filtering on activity
  if (filters.activityFilter) {
    countries = countries.filter(country => country.Activities?.includes(filters.activityFilter));
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCountries = countries.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    // setCurrentPage(currentPage - 1);
    onPageChange(currentPage - 1);
  }

  const handleNextPage = () => {
    // setCurrentPage(currentPage + 1);
    onPageChange(currentPage + 1);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        {countriesByName.message ? content : displayedCountries.map(country => (
          <Card key={country.id} name={country.name} flag={country.flag} continents={country.continents} id={country.id} />
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={currentPage !== 1 ? styles.enabledButton : ''}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={currentPage !== totalPages ? styles.enabledButton : ''}>Next</button>
      </div>
    </div>
  )
}

CardsContainer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  // setCurrentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  countriesByName: PropTypes.array.isRequired,
};

export default CardsContainer