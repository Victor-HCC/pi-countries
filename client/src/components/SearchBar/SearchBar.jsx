import styles from './SearchBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchActivityNames } from '../../redux/activitiesSlicer';
import axios from 'axios';

const SearchBar = ({ handleSearchChange, filters, handleFilterchange, onPageChange }) => {

  const [search, setSearch] = useState('');
  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  };
  const handleSearch = async () => {
    try {
      const response = (await axios.get(`http://localhost:3001/countries?name=${search}`));
      const data = response.data;
      handleSearchChange(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  const handleSearchClick = () => {
    handleSearch();
  };

  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities.names);

  useEffect(() => {
    dispatch(fetchActivityNames())
  }, [dispatch])

  const { searchName,
  sortByName,
  sortByPopulation,
  continentFilter,
  activityFilter } = filters

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    handleFilterchange(property, value)
    onPageChange(1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input className={styles.searchText} type="text" placeholder='Search by name' name='searchName' value={search} onChange={handleSearchInput} />
        <button className={styles.searchBtn} onClick={handleSearchClick}>Search</button>
      </div>

      <div className={styles.selectContainer}>
        <label>Sort by name: </label>
        <select name='sortByName' value={sortByName} onChange={changeHandler}>
          <option value="">--Select--</option>
          <option value="alpha-ascending">A &rarr; Z</option>
          <option value="alpha-descending">Z &rarr; A</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label>Sort by population: </label>
        <select name='sortByPopulation' value={sortByPopulation} onChange={changeHandler}>
          <option value="">--Select--</option>
          <option value="minmax">Min to Max</option>
          <option value="maxmin">Max to Min</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label>Filter by continent: </label>
        <select name="continentFilter" value={continentFilter} onChange={changeHandler}>
          <option value="">--Select--</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Antarctica">Antarctica</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label>Filter by activity</label>
        <select name="activityFilter" value={activityFilter} onChange={changeHandler}>
          <option value="">--Select--</option>
          {activities.map((activity) => {
            return <option key={activity} value={activity}>{activity}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default SearchBar

