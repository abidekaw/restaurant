import { useState } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';

const Add = ({ setClose }) => {
   const [file, setFile] = useState(null);
   const [title, setTitle] = useState(null);
   const [desc, setDesc] = useState(null);
   const [prices, setPrices] = useState([]);
   const [extraOptions, setExtraOptions] = useState([]);
   const [extra, setExtra] = useState(null);

   const changePrice = (e, index) => {
      const currentPrices = prices;
      currentPrices[index] = e.target.value;
      setPrices(currentPrices);
   };

   const handleExtraInput = (e) => {
      setExtra({ ...extra, [e.target.name]: e.target.value });
   };

   const handleExtra = (e) => {
      setExtraOptions((prev) => [...prev, extra]);
   };

   const handleCreate = async () => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'uploads');
      try {
         const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dwbsjqbee/image/upload',
            data
         );

         const { url } = uploadRes.data;
         const newProduct = {
            title,
            desc,
            prices,
            extraOptions,
            img: url,
         };

         await axios.post(`${process.env.URL}/api/products`, newProduct);
         setClose(true);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <span onClick={() => setClose(true)} className={styles.close}>
               X
            </span>
            <h1>Tambah menu</h1>
            <div className={styles.item}>
               <label className={styles.label}>Pilih gambar</label>
               <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Nama menu</label>
               <input
                  className={styles.input}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Deskripsi</label>
               <textarea
                  rows={4}
                  type="text"
                  onChange={(e) => setDesc(e.target.value)}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Harga</label>
               <div className={styles.priceContainer}>
                  <input
                     className={`${styles.input} ${styles.inputSm}`}
                     type="number"
                     placeholder="Small"
                     onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                     className={`${styles.input} ${styles.inputSm}`}
                     type="number"
                     placeholder="Medium"
                     onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                     className={`${styles.input} ${styles.inputSm}`}
                     type="number"
                     placeholder="Large"
                     onChange={(e) => changePrice(e, 2)}
                  />
               </div>
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Tambahan</label>
               <div className={styles.extra}>
                  <input
                     className={`${styles.input} ${styles.inputSm}`}
                     type="text"
                     placeholder="Item"
                     name="text"
                     onChange={handleExtraInput}
                  />
                  <input
                     className={`${styles.input} ${styles.inputSm}`}
                     type="number"
                     placeholder="Price"
                     name="price"
                     onChange={handleExtraInput}
                  />
                  <button className={styles.extraButton} onClick={handleExtra}>
                     Ok
                  </button>
               </div>
               <div className={styles.extraItems}>
                  {extraOptions.map((option) => (
                     <span key={option.text} className={styles.extraItem}>
                        {option.text}
                     </span>
                  ))}
               </div>
            </div>
            <button className={styles.addButton} onClick={handleCreate}>
               Tambahkan
            </button>
         </div>
      </div>
   );
};

export default Add;
