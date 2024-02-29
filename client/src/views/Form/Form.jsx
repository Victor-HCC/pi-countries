import styles from './Form.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../redux/countriesSlicer';

const Form = () => {

  const dispatch = useDispatch();
  const countryNames = useSelector(state => state.countries.names);
  
  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  const [selectedCountries, setSelectedCountries] = useState([]);

  const [form, setForm] = useState({
    name: '',
    difficulty: '1',
    duration: '',
    season: '',
    countries: selectedCountries
  })

  const [errors, setErrors] = useState({
    name: '',
    duration: '',
    season: '',
    countries: ''
  })

  const changeHandler = (e) => {
    const property = e.target.name;
    let value = e.target.value;

    if(property === 'name') {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    setForm({...form, [property]: value})
  }

  const selectedCountriesHandler = (e) => {
    const value = e.target.value;
    if(!selectedCountries.includes(value)) {
      setSelectedCountries([...selectedCountries, value])
      setForm({...form, countries: [...selectedCountries, value]})
    }
  }

  const removeCountry = (country) => {
    const updatedCountries = selectedCountries.filter(elem => elem !== country);
    setSelectedCountries(updatedCountries)
    setForm({...form, countries: updatedCountries})
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validate(form);

    if(isValid) {
      axios.post('http://localhost:3001/activities', form)
        .then(() => {
          setForm({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
          });
          setSelectedCountries([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const validate = (form) => {
    const regex = /[^A-Za-z]/;

    const newErrors = {
      name: '',
      duration: '',
      season: '',
      countries: ''
    };

    let passed = true
    
    if(regex.test(form.name) || form.name.length < 3) {
      newErrors.name = 'Name has to have at least 3 characteres and only letters';
      passed = false
    }
    
    if(!form.duration) {
      newErrors.duration = 'You have to select a duration';
      passed = false
    }
    
    if(!form.season) {
      newErrors.season = 'You have to select a season';
      passed = false
    }
    
    if(form.countries.length === 0) {
      newErrors.countries = 'You have to select at least one country';
      passed = false
    }

    setErrors(newErrors);

    return passed;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create new activity</h1>

      <form onSubmit={submitHandler} className={styles.form}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={form.name} onChange={changeHandler} />
          <br></br>
          {errors.name && <span>{errors.name}</span>} 
        </div>

        <div>
          <label>Difficulty: </label>
          <select name="difficulty" value={form.difficulty} onChange={changeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* <div>
          <label>Duration: </label>
          <input type="text" name="duration" value={form.duration} onChange={changeHandler} />
        </div> */}
        <div>
          <div className={styles.durationDiv}>
            <label>Duration: </label>
            <input name='duration' type="range" min="1" max="12" value={form.duration} onChange={changeHandler} />
            <p>{form.duration} {form.duration === "1" ? 'hour' : 'hours'}</p>
          </div>
          <br></br>
          {errors.duration && <span>{errors.duration}</span>}
        </div>

        <div>
          <label>Season: </label>
          <select name="season" value={form.season} onChange={changeHandler}>
            <option value=''>--Select--</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
          <br></br>
          {errors.season && <span>{errors.season}</span>}
        </div>

        <div className={styles.selectCountries}>
          <div className={styles.selectContainer}>
            <label>Country: </label>
            <select className={''} name="countries" multiple value={form.countries || []} onChange={selectedCountriesHandler} size={10} >
              {countryNames.map((country) => {
                return <option key={country} value={country}>{country}</option>
              })}
            </select>
          </div>

          <div>
            <p>Selected Countries:</p>
            <ul>
              {selectedCountries.map((country, index) => (
                <li key={index}>
                  {country}
                  <button type="button" onClick={() => removeCountry(country)}>X</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
            <br></br>
            {errors.countries && <span>{errors.countries}</span>}


        <button className={styles.buttonForm} type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Form
