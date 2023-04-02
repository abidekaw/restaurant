import styles from '../styles/Add.module.css';

const AddButton = ({ setClose }) => {
   return (
      <div className={styles.wrapperMainAddBtn}>
         <div onClick={() => setClose(false)} className={styles.mainAddButton}>
            Tambah Menu
         </div>
      </div>
   );
};

export default AddButton;
