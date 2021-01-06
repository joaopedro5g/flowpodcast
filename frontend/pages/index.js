import Link from 'next/link';
import { useEffect, useContext } from 'react';

import {
  Container,
  Originals,
  Title,
  Programmings,
  Tablet,
  Image,
  Lasted,
  Card,
  CardImage,
  PlayIcon,
  PlayButton
} from '../styled-components/index';

export default function Home({ data, socket }) {
  const useLoader = ({ src }) => src;
  useEffect(() => console.log(socket), []);
  return (
    <Container>
      <Originals>
        <Title>Flow's Originals</Title>
        <Programmings>
          <Link href="/podcast/flow">
            <Tablet>
              <Image
                className="radius"
                loader={useLoader}
                src="/image/flow.jpeg"
                width="100px"
                height="120px"
              />
              <span>Flow Podcast</span>
            </Tablet>
          </Link>
          <Link href="/podcast/deriva">
            <Tablet>
              <Image
                className="radius"
                loader={useLoader}
                src="/image/aderiva.jpg"
                width="100px"
                height="120px"
              />
              <span>A Deriva Podcast</span>
            </Tablet>
          </Link>
          <Link href="/podcast/venus">
            <Tablet>
              <Image
                className="radius"
                loader={useLoader}
                src="/image/venus.jpg"
                width="100px"
                height="120px"
              />
              <span>Venus Podcast</span>
            </Tablet>
          </Link>
        </Programmings>
      </Originals>
      <Lasted>
        {
          data.map((ep, i) => (
            <Link href={`/details/${ep.id}`} key={i}>
              <Card>
                <CardImage>
                  <Image
                    className="card"
                    loader={useLoader}
                    src={ep.image}
                    width="200px"
                    height="200px"
                  />
                  <PlayIcon>
                    <PlayButton />
                  </PlayIcon>
                </CardImage>
              </Card>
            </Link>
          ))
        }
      </Lasted>
    </Container>
  )
}


export async function getStaticProps() {
  const data = await fetch('http://localhost:3000/api/episodes').then(res => res.json());
  return {
    props: { data },
    revalidate: 30
  }
}