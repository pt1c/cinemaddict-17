const MAX_DESCRIPTION_LENGTH = 140;
const FILMS_PER_PAGE = 5;

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

export {
  MAX_DESCRIPTION_LENGTH,
  FILMS_PER_PAGE,
  FILTER_TYPES,
  FILTER_NAMES,
  SORT_TYPES
};
