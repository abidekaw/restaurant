import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
   return (
      <div className={styles.container}>
         <div className={styles.item}>All rights reserved &copy; 2023</div>
      </div>
   );
};

export default Footer;
