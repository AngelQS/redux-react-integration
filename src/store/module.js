export const turnOn = () => {
  sendSignalA();
  sendSignalB();
  console.log("TV is ON");
};

export const sendSignalA = () => {};
export const sendSignalB = () => {};
