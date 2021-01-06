import FlowSDK from './flow-class.js';

async function createSocketElement() {
  const script = document.createElement('script');
  const audio = document.createElement('audio');
  audio.id = `flow-player`;
  audio.autoplay = true;
  audio.preload = "metadata"
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.0/socket.io.js';
  document.body.append(script);
  document.body.append(audio);
  return new Promise(resolve => setTimeout(resolve, 800));
}

window.onload = async () => {
  await createSocketElement();
  const floow = new FlowSDK({ name: 'SoundPi', userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJzY29wZXMiOlsiZmxvb3ctY29ubmVjdCJdLCJpYXQiOjE2MDk5Njg5NzR9.4lXgCi1qYi9lbyBfYXD63pkgO9HvbRbkDmokCpvzeAo' });
  floow.onPlayer(ep => {
    document.getElementById('flow-player').src = ep.audio;
    document.getElementById('flow-player').currentTime = ep.time;
    document.getElementById('flow-player').volume = ep.volume;
    document.getElementById('flow-player').play();
  })
  floow.onPlay((state) => {
    if(state) {
      document.getElementById('flow-player').play();
    } else {
      document.getElementById('flow-player').pause();
    }
  })
  floow.onSeeking(_ => console.log("SEEKING..."));
  floow.onVolume(volume => console.log('VOLUME',volume));
}