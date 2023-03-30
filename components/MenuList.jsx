import styles from '../styles/MenuList.module.css';
import MenuCard from './MenuCard';

const MenuList = ({ menuList }) => {
   return (
      <div className={styles.container}>
         <h1 className={styles.title}>MENU SEDAP MALAM</h1>
         <p className={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
            arcu in pretium molestie. Interdum et malesuada fames acme. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit.
         </p>
         <div className={styles.wrapper}>
            {menuList.map((menu) => (
               <MenuCard key={menu._id} menu={menu} />
            ))}
         </div>
      </div>
   );
};

export default MenuList;
