const MAX_DESCRIPTION_LENGTH = 140;
const FILMS_PER_PAGE = 5;

const AUTHORIZATION = 'Basic ffDSsnndFe37fs32';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const FilterName = {
  [FilterType.ALL]: 'All movies',
  [FilterType.WATCHLIST]: 'Watchlist',
  [FilterType.HISTORY]: 'History',
  [FilterType.FAVORITES]: 'Favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const UserAction = {
  FILM_UPDATE: 'FILM_UPDATE',
  COMMENT_ADD: 'COMMENT_ADD',
  COMMENT_DELETE: 'COMMENT_DELETE',
  INIT: 'INIT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  MAX_DESCRIPTION_LENGTH,
  FILMS_PER_PAGE,
  AUTHORIZATION,
  END_POINT,
  FilterType,
  FilterName,
  SortType,
  UserAction,
  UpdateType,
  Method,
  TimeLimit
};
