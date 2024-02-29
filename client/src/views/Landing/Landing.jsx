import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className={styles.container }>
      <div className={styles.title}>Countries App</div>

      <div className={styles.linkContainer}>
        <Link to='/home' className={styles.link}>Home Page</Link>
      </div>
    </div>
  )
}

export default Landing;
