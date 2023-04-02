import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import OrderDetail from '../components/OrderDetail';
import Link from 'next/link';

const Cart = () => {
   const cart = useSelector((state) => state.cart);
   console.log(cart.products.length);
   const [open, setOpen] = useState(false);
   const [cash, setCash] = useState(false);
   const dispatch = useDispatch();
   const router = useRouter();

   const createOrder = async (data) => {
      try {
         const res = await axios.post(`${process.env.URL}/api/orders`, data);
         if (res.status === 201) {
            dispatch(reset());
            router.push(`/orders/${res.data._id}`);
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <table className={styles.table}>
               <thead>
                  <tr className={styles.trTitle}>
                     <th>Produk</th>
                     <th>Nama</th>
                     <th>Tambahan</th>
                     <th>Harga</th>
                     <th>Jumlah</th>
                     <th>Total Harga</th>
                  </tr>
               </thead>
               <tbody>
                  {cart.products.map((product) => (
                     <tr className={styles.tr} key={product._id}>
                        <td>
                           <div className={styles.imgContainer}>
                              <Image
                                 src={product.img}
                                 layout="fill"
                                 objectFit="cover"
                                 alt=""
                              />
                           </div>
                        </td>
                        <td>
                           <span className={styles.name}>{product.title}</span>
                        </td>
                        <td>
                           <span className={styles.extras}>
                              {product.extras.map((extra) => (
                                 <span key={extra._id}>{extra.text}, </span>
                              ))}
                           </span>
                        </td>
                        <td>
                           <span className={styles.price}>
                              Rp.{product.price}
                           </span>
                        </td>
                        <td>
                           <span className={styles.quantity}>
                              {product.quantity}
                           </span>
                        </td>
                        <td>
                           <span className={styles.total}>
                              Rp.{product.price * product.quantity}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className={styles.right}>
            <div className={styles.wrapper}>
               <h2 className={styles.title}>TOTAL PESANAN</h2>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Subtotal:</b>Rp.
                  {cart.total}
               </div>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Discount:</b>Rp.0.00
               </div>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Total:</b>Rp.{cart.total}
               </div>
               {open ? (
                  <div className={styles.paymentMethods}>
                     <button
                        className={styles.payButton}
                        onClick={() => setCash(true)}
                     >
                        COD
                     </button>
                  </div>
               ) : cart.products.length > 0 ? (
                  <button
                     onClick={() => setOpen(true)}
                     className={styles.button}
                  >
                     Pesan Sekarang
                  </button>
               ) : (
                  <Link href="/" passHref>
                     <button className={styles.button}>Pesan dulu yuk</button>
                  </Link>
               )}
            </div>
         </div>
         {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
      </div>
   );
};

export default Cart;
