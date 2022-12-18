const sleep = (ms: number = 1000) =>
  new Promise((reslove) => setTimeout(reslove, ms));

const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + 1);

const getAString = (size: number, str: string) => {
  return Array.from({ length: size }, () => str).join("");
};

export { sleep, randomNum, getAString };
