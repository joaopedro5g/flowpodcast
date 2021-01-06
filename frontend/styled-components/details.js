import styled from 'styled-components';
import ImageNext from 'next/image';


export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.44) 75.05%, #000000 94.32%);
  display: flex;
  justify-content:center;
  flex-direction: column;
  padding: 0 20px;
  color: #fff;
  :after {
    content: "";
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background: url('${props => props.image}') no-repeat;
    background-size: cover;
    background-position: center;
  }
  span {
    font-weight: 500;
    font-size: 22px;
    width: 500px;
    position: relative;
    z-index: 2;
  }
  h1 {
    font-weight: bold;
    position: relative;
    z-index: 2;
  }
  button {
    width: 200px;
    height: 40px;
    color: #000;
    border: none;
    border-radius: 15px;
    position: relative;
    z-index: 2;
    margin-top: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 22px;
  }
`;

export const Image = styled(ImageNext).attrs({
  width: '100%',
  height: '100%'
})`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;