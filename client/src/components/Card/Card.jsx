import PropTypes from 'prop-types';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

const Card = ({id, flag, name, continents}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/detail/${id}`)
  }

  return (
    <div className={styles.container} onClick={clickHandler}>
      <img width={60} src={flag} alt={`Image flag ${name}`} />
      <h2>Name: {name}</h2>
      <h3>Continent: {continents}</h3>
    </div>
  )
}

Card.propTypes = {
  flag: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  continents: PropTypes.string.isRequired,
  id: PropTypes.string
};

export default Card
