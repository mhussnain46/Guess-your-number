const sleep = (ms = 1000) => new Promise((reslove) => setTimeout(reslove, ms));
const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + 1);
const getAString = (size, str) => {
    return Array.from({ length: size }, () => str).join("");
};
export { sleep, randomNum, getAString };
