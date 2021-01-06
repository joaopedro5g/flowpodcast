import React from 'react';

import ImageNext from 'next/image';
import LinkNext from 'next/link';

import {
  Container,
  Menu,
  Item,
  Link,
  Image
} from './style';

function Navbar({ user }) {
  const useLoader = ({ src }) => src;
  return (
    <Container>
      <div style={{
        position: 'absolute',
        left: '15px'
      }}>
        <ImageNext
          width="100px"
          height="70px"
          src="/image/flow.png"
        />
      </div>
      <Menu>
        <Item>
          <LinkNext href="/">
            <Link>
              Home
            </Link>
          </LinkNext>
        </Item>
        <Item>
          <LinkNext href="/concursos">
            <Link>
              Concursos
            </Link>    
          </LinkNext>
        </Item>
      </Menu>
      <div style={{
        position: 'absolute',
        right: '15px'
      }}>
        <Image
          loader={useLoader}
          src={user.image}
        />
      </div>
    </Container>
  );
}

export default Navbar;