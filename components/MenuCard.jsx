import Image from 'next/image';
import styles from '../styles/MenuCard.module.css';
import Link from 'next/link';

const MenuCard = ({ menu }) => {
   return (
      <div className={styles.container}>
         <Link href={`/product/${menu._id}`} passHref>
            <Image
               src={menu.img}
               alt=""
               width="500"
               height="500"
               className={styles.link}
            />
         </Link>
         <div className={styles.wrapper}>
            <h1 className={styles.title}>{menu.title}</h1>
            <span className={styles.price}>Rp.{menu.prices[0]}</span>
            <p className={styles.desc}>{menu.desc}</p>
         </div>
      </div>
   );
};

export default MenuCard;
