import styled, { css } from 'styled-components';

import { motion } from 'framer-motion';

import ImageNext from 'next/image';

import PreviousIcon from '../../assets/previous.svg';
import PlayIcon from '../../assets/play-button.svg';
import PauseIcon from '../../assets/pause.svg';
import NextIcon from '../../assets/next.svg';

import PlayListIcon from '../../assets/playlist.svg';
import MusicBoxIcon from '../../assets/speaker.svg';
import MicrophoneIcon from '../../assets/microphone-with-wire.svg';
import VolumeIcon from '../../assets/audio.svg';

export const Container = styled(motion.div)`
  width: 100%;
  height: 100px;
  background: #181616;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoDetails = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled(ImageNext).attrs({
  width: '50px',
  height: '50px'
})`
  margin-left: 10px;
  border-radius: 5px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  height: 100%;
  flex-direction: column;
  margin-left: 10px;
  #music {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
  }
  #artist {
    color: gray;
  }
`;

export const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin-left: 80px;
  margin-right: -40px;
`;

export const Controller = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items:center;
`;

export const Previous = styled(PreviousIcon)`
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
`;

export const Play = styled(PlayIcon)`
  width: 40px;
  height: 40px;
  fill: #fff;
  cursor: pointer;
`;

export const Pause = styled(PauseIcon)`
  width: 40px;
  height: 40px;
  fill: #fff;
  cursor: pointer;
`;

export const Next = styled(NextIcon)`
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  margin-top: 10px;
  border-radius: 4px;
  position: relative;
  display: flex;
  span {
    font-size: 10px;
    color: #fff;
    margin: 0 2px;
  }
  input {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    outline: none;
    position: relative;
    z-index: 2;
    :hover::-webkit-slider-thumb {
      opacity: 1;
      transition: .4s;
    }
    ::-webkit-slider-thumb {
      opacity: 0;
      transition: .4s;
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      transition: .3s ease-in-out;
    }
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  align-items:center;
  margin-right: -40px;
`;

export const PlayList = styled(PlayListIcon)`
  width: 20px;
  height: 20px;
  margin: 0 15px;
  cursor: pointer;
  ${ props => props.active ? css`fill:#EDAF10;` : css`fill: #fff;` }
`;

export const MusicBox = styled(MusicBoxIcon)`
  width: 22px;
  height: 22px;
  margin: 0 15px;
  cursor: pointer;
  ${ props => props.active ? css`fill:#EDAF10;` : css`fill: #fff;` }
`;

export const Microphone = styled(MicrophoneIcon)`
  fill: #fff;
  width: 22px;
  height: 22px;
  margin: 0 15px;
`;

export const Volume = styled(VolumeIcon)`
  fill: #fff;
  width: 22px;
  height: 22px;
  margin: 0 15px;
`;

export const AudioModalContainer = styled(motion.div)`
  width: 100%;
  height: 140px;
  background: #181616;
  position: fixed;
  bottom: 100px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items:center;
  padding: 0 20px;
`;

export const VolumeContainer = styled.div`
  margin-top: 2px;
  position: relative;
  display: flex;
  justify-content:center;
  align-items:center;
`;

export const VolumeContent = styled.div`
  width: 120px;
  height: 30px;
  background: #181616;
  border-radius: 5px;
  display: flex;
  justify-content:center;
  align-items:center;
  input {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 4px;
    outline: none;
    position: relative;
    z-index: 2;
    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      transition: .3s ease-in-out;
    }
  }
`;

export const ListSound = styled.div`
  width: 90px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  svg {
    width: 80px;
    height: 80px;
  }
  span {
    color: #fff;
    font-size: 22px;
    margin-top: 4px;
  }
`;

export const PlayListContainer = styled(motion.div)`
  width: 100%;
  height: calc(100% - 170px);
  background: #181616;
  position: fixed;
  bottom: 100px;
  padding: 20px 40px;
  overflow: auto;
`;

export const ListContainer = styled.div`
  width: 100%;
  min-height: 70px;
  max-height: 70px;
  border-radius: 10px;
  border: 1px solid ${props => props.active ? '#EDAF10' : '#ccc'};
  margin-bottom: 15px;
  cursor:pointer;
  display: flex;
  align-items:center;
  padding-left: 30px;
  transition: .4s;
`;

export const PlaylistImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;
  #music {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
  }
  #artist {
    color: gray;
  }
`;