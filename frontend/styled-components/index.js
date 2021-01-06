import styled from 'styled-components';

import ImageNext from 'next/image';

import PlayButtonIcon from '../assets/play-button-arrowhead.svg';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #2D2D2D;
  overflow: hidden;
  padding: 90px 0 100px;
`;

export const Originals = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items:center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 72px;
  color: #fff;
`;

export const Programmings = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content:space-around;
`;

export const Tablet = styled.div`
  width: 300px;
  height: 120px;
  background: #6F6F6E;
  border-radius: 30px;
  display: flex;
  align-items:center;
  cursor: pointer;
  span {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    margin-left: 10px;
  }
`;

export const Image = styled(ImageNext)`
  &.radius {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  &.card {
    border-radius: 30px;
  }
`;

export const Lasted = styled.div`
  padding: 0 31px;
  :after {
    content: "";
    display: table;
    justify-content:space-around;
    align-items:center;
  }
`;

/**
 * width: 100%;
  height: 450px;
  display: flex;
  justify-content:space-around;
  align-items:center;
 */

export const Card = styled.div`
  width: 300px;
  height: 350px;
  background: #6f6f6f;
  border-radius: 30px;
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  float: left;
  margin-right: 53px;
  margin-bottom: 20px;
  cursor:pointer;
`;

export const CardImage = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
`;

export const PlayIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #EDAF10;
  position: absolute;
  bottom: 10px;
  right: 15px;
  display: flex;
  justify-content:center;
  align-items:center;
`;

export const PlayButton = styled(PlayButtonIcon)`
  fill: #fff;
  width: 25px;
  height: 25px;
`;