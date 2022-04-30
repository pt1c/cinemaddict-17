import {
  TITLES,
  POSTERS,
  DESCRIPTIONS,
  MIN_DESCRIPTION_SENTENCES,
  MAX_DESCRIPTION_SENTENCES,
  FILM_GENRES,
  MIN_GENRES,
  MAX_GENRES,
  MIN_RUNTIME,
  MAX_RUNTIME,
  POSTER_PRE_URL,
  AGE_RATINGS,
  PEOPLE_NAMES,
  MIN_WRIGHTERS,
  MAX_WRIGHTERS,
  MIN_ACTORS,
  MAX_ACTORS,
  COUNTRIES,
  MIN_RATING,
  MAX_RATING,
  GENERATE_COMMENTS,
  MIN_COMMENTS,
  MAX_COMMENTS
} from './mock-const.js';

import {
  getRandomInteger,
  generateBool,
  getRandomArrayValue,
  getRandomArray,
  getRandomUniqueArray,
  getRandomDate,
  queryIdGenerator
} from './mock-utils.js';

const generateNextFilmId = queryIdGenerator();
const generateTitle = () => getRandomArrayValue(TITLES);
const generateAlternativeTitle = () => getRandomArrayValue(TITLES);
const generateDescription = () => getRandomArray(DESCRIPTIONS, MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES).join(' ');
const generateGenres = () => getRandomUniqueArray(FILM_GENRES, MIN_GENRES, MAX_GENRES);
const generateRuntime = () => getRandomInteger(MIN_RUNTIME, MAX_RUNTIME);
const generatePosterUrl = () => (POSTER_PRE_URL + getRandomArrayValue(POSTERS));
const generateAgeRating = () => (generateBool()) ? getRandomArrayValue(AGE_RATINGS) : 0;
const generateDirector = () => getRandomArrayValue(PEOPLE_NAMES);
const generateWriters = () => getRandomUniqueArray(PEOPLE_NAMES, MIN_WRIGHTERS, MAX_WRIGHTERS);
const generateActors = () => getRandomUniqueArray(PEOPLE_NAMES, MIN_ACTORS, MAX_ACTORS);
const generateCountry = () => getRandomArrayValue(COUNTRIES);

const generateCommentsIds = () => {
  const elementsNumber = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({length: elementsNumber}, () => getRandomInteger(1, GENERATE_COMMENTS));
};

const generateRating = () => {
  const ceil = getRandomInteger(MIN_RATING, MAX_RATING);
  const div = getRandomInteger(0, 9);
  return (ceil === MAX_RATING) ? `${ceil}.0` : `${ceil}.${div}`;
};

export const generateFilm = () => ({
  id: generateNextFilmId(),
  comments: generateCommentsIds(),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateAlternativeTitle(),
    totalRating: generateRating(),
    poster: generatePosterUrl(),
    ageRating: generateAgeRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      date: getRandomDate(),
      releaseCountry: generateCountry(),
    },
    runtime: generateRuntime(),
    genre: generateGenres(),
    description: generateDescription(),
  },
  userDetails: {
    watchlist: generateBool(),
    alreadyWatched: generateBool(),
    watchingDate: getRandomDate(),
    favorite: generateBool()
  }
});
