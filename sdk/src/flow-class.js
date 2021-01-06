export default class FlowSDK {
  constructor({ name, userToken }) {
    this.name = name;
    this.userToken = userToken;
    this.socket = io('http://localhost:3333', {
      query: { type: 'sound', name: this.name },
      auth: { token: userToken }
    });
  }
  onPlayer(f) {
    this.socket.on('play', f);
  } 
  onPlay(f) {
    this.socket.on('pp', data => {
      f(data.state);
      this.socket.emit('sync', {
        time: document.getElementById('flow-player').currentTime,
        control: data.controlId
      })
    });
  }
  onSeeking(f) {
    this.socket.on('seeking', data => {
      document.getElementById('flow-player').currentTime = data.time;
      document.getElementById('flow-player').pause();
      this.socket.emit('waiting', {
        time: document.getElementById('flow-player').currentTime,
        control: data.controlId
      })
    })
  }
  onVolume(f) {
    this.socket.on('volume', data => {
      document.getElementById('flow-player').volume = data.volume;
      f(data);
    });
  }
}