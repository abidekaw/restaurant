import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const Product = ({ menu }) => {
   const [price, setPrice] = useState(menu.prices[0]);
   const [size, setSize] = useState(0);
   const [quantity, setQuantity] = useState(1);
   const [extras, setExtras] = useState([]);
   const dispatch = useDispatch();

   const changePrice = (number) => {
      setPrice(price + number);
   };

   const handleSize = (sizeIndex) => {
      const difference = menu.prices[sizeIndex] - menu.prices[size];
      setSize(sizeIndex);
      changePrice(difference);
   };

   const handleChange = (e, option) => {
      const checked = e.target.checked;

      if (checked) {
         changePrice(option.price);
         setExtras((prev) => [...prev, option]);
      } else {
         changePrice(-option.price);
         setExtras(extras.filter((extra) => extra._id !== option._id));
      }
   };

   const handleClick = () => {
      dispatch(addProduct({ ...menu, extras, price, quantity }));
   };

   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <div className={styles.imgContainer}>
               <Image src={menu.img} objectFit="contain" layout="fill" alt="" />
            </div>
         </div>
         <div className={styles.right}>
            <h1 className={styles.title}>{menu.title}</h1>
            <span className={styles.price}>Rp.{price}</span>
            <p className={styles.desc}>{menu.desc}</p>
            <h3 className={styles.choose}>Pilih ukuran</h3>
            <div className={styles.sizes}>
               <div className={styles.size} onClick={() => handleSize(0)}>
                  <Image src="/img/plate.png" layout="fill" alt="" />
                  <span className={styles.number}>Small</span>
               </div>
               <div className={styles.size} onClick={() => handleSize(1)}>
                  <Image src="/img/plate.png" layout="fill" alt="" />
                  <span className={styles.number}>Medium</span>
               </div>
               <div className={styles.size} onClick={() => handleSize(2)}>
                  <Image src="/img/plate.png" layout="fill" alt="" />
                  <span className={styles.number}>Large</span>
               </div>
            </div>
            <h3 className={styles.choose}>Tersedia Tambahan</h3>
            <div className={styles.ingredients}>
               {menu.extraOptions.map((option) => (
                  <div className={styles.option} key={option._id}>
                     <input
                        type="checkbox"
                        id={option.text}
                        name={option.text}
                        className={styles.checkbox}
                        onChange={(e) => handleChange(e, option)}
                     />
                     <label htmlFor="double">{option.text}</label>
                  </div>
               ))}
            </div>
            <div className={styles.add}>
               <input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  defaultValue={1}
                  className={styles.quantity}
               />
               <button className={styles.button} onClick={handleClick}>
                  Buat Pesanan
               </button>
            </div>
         </div>
      </div>
   );
};

export const getServerSideProps = async ({ params }) => {
   const res = await axios.get(
      `http://localhost:3000/api/products/${params.id}`
   );
   return {
      props: {
         menu: res.data,
      },
   };
};

export default Product;
