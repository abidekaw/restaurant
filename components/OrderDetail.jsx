import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

const OrderDetail = ({ total, createOrder }) => {
   const [customer, setCustomer] = useState('');
   const [address, setAddress] = useState('');

   const handleClick = () => {
      createOrder({ customer, address, total, method: 0 });
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1 className={styles.title}>Biaya pengiriman 50k</h1>
            <div className={styles.item}>
               <label className={styles.label}>Nama</label>
               <input
                  placeholder="John Doe"
                  type="text"
                  className={styles.input}
                  onChange={(e) => setCustomer(e.target.value)}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Nomor Telepon</label>
               <input
                  type="text"
                  placeholder="+62 23456789"
                  className={styles.input}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Alamat</label>
               <textarea
                  rows={5}
                  placeholder="Jl..."
                  type="text"
                  className={styles.textarea}
                  onChange={(e) => setAddress(e.target.value)}
               />
            </div>
            <button className={styles.button} onClick={handleClick}>
               Pesan Sekarang!
            </button>
         </div>
      </div>
   );
};

export default OrderDetail;
