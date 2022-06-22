const MAX_DESCRIPTION_LENGTH = 140;
const FILMS_PER_PAGE = 5;

const AUTHORIZATION = 'Basic ffDSsnndFe37fs32';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const FILTER_TYPES = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const FILTER_NAMES = {
  [FILTER_TYPES.ALL]: 'All movies',
  [FILTER_TYPES.WATCHLIST]: 'Watchlist',
  [FILTER_TYPES.HISTORY]: 'History',
  [FILTER_TYPES.FAVORITES]: 'Favorites',
};

const SORT_TYPES = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const USER_ACTION = {
  FILM_UPDATE: 'FILM_UPDATE',
  COMMENT_ADD: 'COMMENT_ADD',
  COMMENT_DELETE: 'COMMENT_DELETE',
  INIT: 'INIT',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
};

const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  MAX_DESCRIPTION_LENGTH,
  FILMS_PER_PAGE,
  FILTER_TYPES,
  FILTER_NAMES,
  SORT_TYPES,
  USER_ACTION,
  UPDATE_TYPE,
  AUTHORIZATION,
  END_POINT,
  METHOD,
  TIME_LIMIT
};
