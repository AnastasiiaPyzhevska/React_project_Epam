const convertTime = (time) => {
  let hour = Math.floor(time / 60);
  let min = Math.floor(time - hour * 60);

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  return `${hour}:${min} hours`;
};

export default convertTime;
