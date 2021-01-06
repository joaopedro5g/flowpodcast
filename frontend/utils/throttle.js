const throttle = (fn, delay) => {
  let lastTime = 0;
  return (...args) => {
      const currentTime = new Date().getTime();
      if((currentTime - lastTime) < delay) {
        return;
      };
      lastTime = currentTime;
      return fn(...args);
  }
};

export default throttle