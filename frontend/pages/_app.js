import Head from 'next/head';
import { useRouter } from 'next/router';

import useUser from '../utils/useUser';

import { PlayContextProvider } from '../components/Context';

import { useEffect, useState } from 'react';

import '../styles/globals.css';

import io from 'socket.io-client';

import BottomPlay from '../components/BottomPlay';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [socket,setSocket] = useState(null);
  const [changePage,setChangePage] = useState(false);
  const [bottom,setBottom] = useState(true);
  const { user } = useUser()
  const routes = useRouter();
  useEffect(() => {
    if(routes.pathname.includes('/details')) {
      setBottom(false);
    } else {
      setBottom(true);
    }
  }, [routes.pathname])
  useEffect(() => {
    console.log(routes.pathname);
    if(user && routes.isReady) {
      const socket = io('http://localhost:3333', {
        query: {
          type: 'controller'
        },
        auth: { token: user.session }
      });
      setSocket(socket);
    }
    routes.events.on('routeChangeStart', (e) => setChangePage(true));
    routes.events.on('routeChangeComplete', (e) => setChangePage(false));
  }, [user]);
  return (
    <PlayContextProvider>
      { changePage && <div className="changePage" /> }
      <Head>
        <title>Flow Podcast</title>
        <link rel="icon" href="https://flowpodcast.com.br/favicon.ico" />
      </Head>
      <main>
        {
          socket &&
          <>
            <Component {...pageProps} socket={socket} user={user} />
            <BottomPlay socket={socket} user={user} />
            <Navbar user={user} />
          </>
        }
      </main>
    </PlayContextProvider>
  );
}

export async function getServerSideProps(req,res) {
  console.log("PAGINA");
  return {
    props: { data:undefined }
  }
}

export default MyApp
