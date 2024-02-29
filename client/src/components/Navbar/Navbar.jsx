import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation().pathname;

  return (
    <div className={styles.container}>
      <Link to='/home' className={styles.title}>
        <h1>Countries App</h1>
      </Link>
      <div className={styles.links}>
        {location !== '/home' && <Link to='/home'>Home</Link>}
        {location !== '/form' && <Link to='/form'>Create new activity</Link>}
      </div>
    </div>
  )
}

export default Navbar
