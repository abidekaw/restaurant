import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import Featured from '../components/Featured';
import MenuList from '../components/MenuList';
import styles from '../styles/Home.module.css';

const Home = ({ menuList, admin }) => {
   const [close, setClose] = useState(true);

   return (
      <div className={styles.container}>
         <Head>
            <title>Sedap Malam</title>
            <meta name="description" content="lezat nyaman terjangkau" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Featured />
         {<AddButton setClose={setClose} />}
         <MenuList menuList={menuList} />
         {!close && <Add setClose={setClose} />}
      </div>
   );
};

export async function getServerSideProps(ctx) {
   const myCookie = ctx.req?.cookies || '';
   let admin = false;

   if (myCookie.token === process.env.TOKEN) {
      admin = true;
   }

   const res = await axios.get('http://localhost:3000/api/products');
   return {
      props: {
         menuList: res.data,
         admin,
      },
   };
}

export default Home;
