import styled from 'styled-components';

import ImageNext from 'next/image';

export const Container = styled.div`
  width: 100%;
  height: 70px;
  background: #1f1f1f;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 0 5px;
`;

export const Image = styled(ImageNext).attrs({
  width: '45px',
  height: '45px'
})`
  border-radius: 50%;
  cursor: pointer;
`;

export const Menu = styled.ul`
  min-width: 50px ;
  height: 100%;
  display: flex;
  justify-content:center;
  align-items:center;
`;

export const Item = styled.li`
  list-style: none;
  margin-right: 10px;
`;

export const Link = styled.div`
  font-size: 22px;
  color: #fff;
  cursor: pointer;
`;