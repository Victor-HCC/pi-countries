import CardsContainer from '../../components/CardsContainer/CardsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';
import { useState } from 'react';
import { setCurrentPage } from '../../redux/countriesSlicer';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.countries.currentPage); // Get currentPage from Redux store

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page)); // Dispatch action to update currentPage in Redux store
  };

  // const [currentPage, setCurrentPage] = useState(1);

  const [searchedCountries, setSearchedCountries] = useState([]);
  const [filters, setFilters] = useState( {
    searchName: '',
    sortByName: '',
    sortByPopulation: '',
    continentFilter: '',
    activityFilter: ''
  })

  const handleFilterchange = (key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }))
  }

  const handleSearchChange = (countries) => {
    setSearchedCountries(countries);
    handlePageChange(1); // para reseatear la paginacion al hacer una busqueda
  }

  return (
    <div className={styles.container}>
      <SearchBar handleSearchChange={handleSearchChange} filters={filters} handleFilterchange={handleFilterchange} onPageChange={handlePageChange} />
      <CardsContainer currentPage={currentPage} /*setCurrentPage={setCurrentPage}*/ onPageChange={handlePageChange}
        filters={filters} countriesByName={searchedCountries} />
    </div>
  )
}

export default Home
