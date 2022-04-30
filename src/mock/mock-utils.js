import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateBool = () => Boolean(getRandomInteger());

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const getRandomArrayValue = (inputArray) => inputArray[getRandomInteger(0, inputArray.length - 1)];

const getRandomArray = (inputArray, min, max) => {
  const elementsNumber = getRandomInteger(min, max);
  return Array.from({length: elementsNumber}, () => getRandomArrayValue(inputArray));
};

const getRandomUniqueArray = (inputArray, min, max) => {
  const elementsNumber = getRandomInteger(min, max);
  return shuffleArray(inputArray.slice()).slice(0, elementsNumber);
};

const getRandomDate = () => {
  const years = getRandomInteger(-10, 0);
  const months = getRandomInteger(-12, 0);
  const days = getRandomInteger(-31, 0);
  const hours = getRandomInteger(-24, 0);
  const minutes = getRandomInteger(-60, 0);
  const seconds = getRandomInteger(-60, 0);
  return dayjs()
    .utc()
    .add(years, 'year')
    .add(months, 'month')
    .add(days, 'day')
    .add(hours, 'hour')
    .add(minutes, 'minute')
    .add(seconds, 'second')
    .format();
};

const getRandomCommentDate = () => {
  const days = getRandomInteger(-31, 0);
  const hours = getRandomInteger(-24, 0);
  const minutes = getRandomInteger(-60, 0);
  const seconds = getRandomInteger(-60, 0);
  return dayjs()
    .utc()
    .add(days, 'day')
    .add(hours, 'hour')
    .add(minutes, 'minute')
    .add(seconds, 'second')
    .format();
};

const queryIdGenerator = () => {
  let nextId = 0;
  return function getNext() {
    return ++nextId;
  };
};

export {
  getRandomInteger,
  generateBool,
  getRandomArrayValue,
  getRandomArray,
  getRandomUniqueArray,
  getRandomDate,
  queryIdGenerator,
  getRandomCommentDate
};
