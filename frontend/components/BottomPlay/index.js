import React, { useState, useRef, useEffect, useContext } from 'react';

import {
  useRouter
} from 'next/router';

import { useAnimation } from 'framer-motion';

import PlayContext from '../../components/Context';

import {
  Container,
  InfoDetails,
  Image,
  TextContainer,
  PlayerContainer,
  OptionsContainer,
  Controller,
  Previous,
  Next,
  Play,
  Pause,
  ProgressBar,
  PlayList,
  MusicBox,
  Volume,
  AudioModalContainer,
  VolumeContainer,
  VolumeContent,
  ListSound,
  PlayListContainer,
  ListContainer,
  PlaylistImage,
  TitleContainer
} from './style';

function BottomPlay({ socket, user }) {
  const useLoader = ({ src }) => src;
  const { id, setId } = useContext(PlayContext);
  const routes = useRouter();
  const [play,setPlay] = useState(false);
  const [widthTime,setWidthTime] = useState(0);
  const [loading,setLoading] = useState(false);
  const [focus,setFocus] = useState(0);
  const [data,setData] = useState([]);
  const audioRef = useRef();
  const animation = useAnimation();
  const [menuSound,setMenuSound] = useState(false);
  const [volume,setVolume] = useState(1);
  const [devices,setDevices] = useState([]);
  const [casting,setCasting] = useState('');
  const [playlist,setPlaylist] = useState(false);
  const player = useAnimation();
  const playlistAnimation = useAnimation();
  useEffect(() => {
    if(!play) {
      audioRef.current?.pause();
      if(casting) socket.emit('pp', { id: casting, state: false });
    } else {
      if(casting) socket.emit('pp', { id: casting, state: true });
      audioRef.current?.play();
    }
  }, [play]);
  useEffect(() => {
    async function root() {
      const devices = await fetch('/api/devices').then(res => res.json());
      setDevices(devices);
    }
    root();
  }, [])
  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', _ => setWidthTime(audioRef.current?.currentTime / audioRef.current?.duration * 100));
    async function root() {
      const data = await fetch('http://localhost:3000/api/episodes').then(res => res.json());
      setData(data);
    }
    socket.on('new-device', data => setDevices(d => [...d, data]));
    socket.on('waiting', _ => socket.emit('pp', { state: true, id: casting }))
    socket.on('device-disconnect', data => {
      setCasting(false);
      setDevices(d => d.filter(({ id }) => id !== data.id))
    });
    socket.on('sync', data => {
      const audio = audioRef.current;
      socket.emit('pp', {
        state: true,
        id: casting
      })
      audio.currentTime = data?.time;
    })
    window.addEventListener('keypress', e => {
      if(e.key === ' ') {
        setPlay(!play);
        e.preventDefault();
      }
    })
    audioRef.current?.addEventListener('play', _ => setPlay(true));
    root();
  }, []);
  useEffect(() => {
    async function root() {
      setFocus(id - 1);
      await player.start('open');
      animation.start('close');
      setTimeout(async () => {
        await animation.start('playerClose');
        player.start('close');
      }, 750);
    }
    if(routes.pathname.includes('/details')) root();
  }, [id, routes.pathname]);
  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setFocus(id - 1);
    setPlay(true);

    if(!!casting) {
      setCasting(casting);
      setPlay(true);
      socket.emit('play', { id: casting, audio: data[id-1]?.audio, title: data[id-1]?.title, time: 0, volume: audioRef.current?.volume })
    }
  }, [id]);
  function SliderSeek(e) {
    const audio = audioRef.current;
    audio.currentTime = audio.duration * (e.target.value / 100);
    if(!!casting) {
      socket.emit('seeking', {
        time: audio.currentTime,
        id: casting
      })
    }
  }
  function handleNextClick() {
    if((focus+1) < data.length)  {
      const audio = audioRef.current;
      audio.currentTime = 0;
      setFocus(f => f+1);
      setPlay(true)
      if(!!casting) {
        setCasting(casting);
        socket.emit('play', { id: casting, audio: data[focus+1]?.audio, title: data[focus+1]?.title, time: audioRef.current?.currentTime, volume: audioRef.current?.volume })
      }
    }
  }
  function handlePrevClick() {
    if(focus > 0)  {
      const audio = audioRef.current;
      audio.currentTime = 0;
      setFocus(f => f-1);
      setPlay(true)
      if(!!casting) {
        setCasting(casting);
        socket.emit('play', { id: casting, audio: data[focus-1]?.audio, title: data[focus+1]?.title, time: audioRef.current?.currentTime, volume: audioRef.current?.volume })
      }
    }
  }
  useEffect(() => {
    if(menuSound) {
      animation.start('open');
    } else {
      animation.start('close');
    }
    setPlaylist(false);
  }, [menuSound]);
  useEffect(() => {
    async function root() {
      if(routes.pathname.includes('/details')) {
        await animation.start('playerClose');
        player.start('close');
      } else {
        await player.start('open');
        animation.start('close');
      }
    }
    root();
  }, [routes.pathname]);
  useEffect(() => {
    const body = document.body;
    if(playlist) {
      body.style.overflow = 'hidden';
      playlistAnimation.start('open');
    } else {
      body.style.overflow = 'auto';
      playlistAnimation.start('close');
    }
    setMenuSound(false);
  }, [playlist]);
  const variant = {
    open: {
      y: '0px',
      transition: {
        duration: .3
      }
    },
    close: {
      y: '140px',
      transition: {
        duration: .3
      }
    },
    playerClose: {
      y: '240px'
    }
  }
  const playerVariant = {
    open: {
      y: '0',
      transition: {
        duration: .3
      }
    },
    close: {
      y: '100px',
      transition: {
        duration: .3
      }
    }
  }
  const playlistVariant = {
    open: {
      y: '0',
      transition: {
        duration: .3
      }
    },
    close: {
      y: window.innerHeight,
      transition: {
        duration: .3
      }
    }
  }
  const audioCurrentTimeFormat = () => {
    const hour = Math.trunc((audioRef.current?.currentTime / 60 / 60) % 60, 10);
    const minutes = Math.trunc((audioRef.current?.currentTime / 60) % 60, 10);
    const seconds = Math.trunc(audioRef.current?.currentTime % 60, 10);
    return audioRef.current?.currentTime ? `${hour > 0 ? `${hour}:` : ''}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}` : '0:00';
  }
  const audioDurationTimeFormat = () => {
    const hour = Math.trunc((audioRef.current?.duration / 60 / 60) % 60, 10);
    const minutes = Math.trunc((audioRef.current?.duration / 60) % 60, 10);
    const seconds = Math.trunc(audioRef.current?.duration % 60, 10);
    return audioRef.current?.duration ? `${hour > 0 ? `${hour}:` : ''}${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}` : seconds}` : '0:00';
  }
  function sendSocket(device, plus = 0) {
    if(casting !== '') {
      setPlay(true);
      socket.emit('play', { id: device.id, audio: '', title: '', time: 0, volume: audioRef.current?.volume })
      setCasting('');
    } else {
      setCasting(device.id);
      setPlay(true);
      socket.emit('play', { id: device.id, audio: data[focus+plus]?.audio, title: data[focus+plus]?.title, time: audioRef.current?.currentTime, volume: audioRef.current?.volume })
    }
  }
  return (
    <>
      <AudioModalContainer
        animate={animation}
        variants={variant}
        initial="close"
      >
        {
          devices.length > 0 && devices.map(device => (
            <ListSound key={device.id}>
              <MusicBox active={device.id === casting} onClick={() => sendSocket(device)} />
              <span>{device.name}</span>
            </ListSound>
          ))
        }
      </AudioModalContainer>
      <PlayListContainer variants={playlistVariant} initial="close" animate={playlistAnimation}>
        {
          data.map(list => (
            <ListContainer key={list.id} onClick={() => setId(list.id)} active={list.id === id}>
              <PlaylistImage src={list.image} />
              <TitleContainer>
                <span id="music">{list.title}</span>
                <span id="artist">{list.provider}</span>
              </TitleContainer>
            </ListContainer>
          ))
        }
      </PlayListContainer>
      <Container
        animate={player}
        variants={playerVariant}
      >
        <audio
          src={data[focus]?.audio}
          preload="metadata"
          ref={audioRef}
          onSeeking={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          muted={!!casting}
          autoPlay
          volume={volume}
        />
        <InfoDetails>
          {
            data.length > 0 &&
            <Image
              loader={useLoader}
              src={data[focus]?.image}
            />
          }
          <TextContainer>
            <span id="music">{data.length > 0 && data[focus].title}</span>
            <span id="artist">{data.length > 0 && data[focus].provider}</span>
          </TextContainer>
        </InfoDetails>
        <PlayerContainer>
          <Controller>
            <Previous onClick={handlePrevClick} />
            { !loading ? play ? <Pause onClick={() => setPlay(!play)} /> : <Play onClick={() => setPlay(!play)} /> : <div className="loadingio-spinner-rolling-ycetw5w3ub"><div className="ldio-ek4a5jkokfj"><div></div></div></div> }
            <Next onClick={handleNextClick} />
          </Controller>
          <ProgressBar currentTime={`${widthTime}%`}>
            <span>{audioCurrentTimeFormat()}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={widthTime}
              style={{
                background: `linear-gradient(to right, #EDAF10 ${widthTime}%, #ddd ${widthTime - 100}%)`
              }}
              onChange={SliderSeek}
            />
            <span>{audioDurationTimeFormat()}</span>
          </ProgressBar>
        </PlayerContainer>
        <OptionsContainer>
          <PlayList onClick={() => setPlaylist(!playlist)} active={playlist} />
          { user.isMember && <MusicBox active={menuSound || !!casting} onClick={() => setMenuSound(!menuSound)} /> }
          <VolumeContainer>
            <Volume />
            <VolumeContent>
              <input
                type="range"
                min="0"
                max="10"
                style={{
                  background: `linear-gradient(to right,#EDAF10 ${volume * 100}%, #ddd ${(volume / 100) * 100}%)`
                }}
                onChange={(e) => {
                  const audio = audioRef.current;
                  const calc = (e.target.value % 100) / 10;
                  setVolume(calc);
                  audio.volume = calc;
                  console.log(calc, calc * 100);
                  if(!!casting) {
                    socket.emit('volume', {
                      volume: calc,
                      id: casting
                    });
                  }
                }}
                />
            </VolumeContent>
          </VolumeContainer>
        </OptionsContainer>
      </Container>
    </>
  );
}

export default BottomPlay;