import React, { useContext } from 'react';
import Head from 'next/head';

import PlayContext from '../../components/Context';

import {
  Container,
  Image
} from '../../styled-components/details';
function Details({ data }) {
  const { id, setId } = useContext(PlayContext);
  const useLoader = ({ src }) => src;
  return (
    <Container image={data.image}>
      <Head>
        <title>Flow Podcast - {data?.title}</title>
      </Head>
      <h1>{data?.title}</h1>
      <span>{data?.description}</span>
      <button onClick={() => setId(data?.id)}>{id === data.id ? 'TOCANDO' : 'PLAY'}</button>
    </Container>
  );
}

export async function getStaticPaths({ params }) {
  const data = await fetch(`http://localhost:3000/api/episodes`).then(res => res.json());
  const paths = data.map(eps => `/details/${eps.id}`);
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const data = await fetch(`http://localhost:3000/api/episodes/${params.id}`).then(res => res.json());
  return {
    props: { data },
    revalidate: 20
  }
}

export default Details;