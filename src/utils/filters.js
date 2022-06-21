import { FILTER_TYPES } from '../const.js';

export const filter = {
  [FILTER_TYPES.ALL]: (films) => films.filter((film) => film),
  [FILTER_TYPES.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FILTER_TYPES.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FILTER_TYPES.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite)
};
