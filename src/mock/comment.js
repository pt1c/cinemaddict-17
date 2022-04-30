import {
  DESCRIPTIONS,
  MIN_DESCRIPTION_SENTENCES,
  MAX_DESCRIPTION_SENTENCES,
  PEOPLE_NAMES,
  EMOCTION
} from './mock-const.js';

import {
  getRandomArrayValue,
  getRandomArray,
  getRandomCommentDate,
  queryIdGenerator
} from './mock-utils.js';

const getNextCommentId = queryIdGenerator();
const getRandomAuthor = () => getRandomArrayValue(PEOPLE_NAMES);
const getRandomText = () => getRandomArray(DESCRIPTIONS, MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES).join(' ');
const getRandomEmoction = () => getRandomArrayValue(EMOCTION);

export const generateComment = () => ({
  id: getNextCommentId(),
  author: getRandomAuthor(),
  comment: getRandomText(),
  date: getRandomCommentDate(),
  emotion: getRandomEmoction()
});
