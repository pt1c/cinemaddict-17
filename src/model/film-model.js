import { GENERATE_FILMS } from '../mock/mock-const.js';
import { FILTER_TYPES } from '../const.js';
import { generateFilm } from '../mock/film.js';


export default class FilmModel {
  #films = Array.from({ length: GENERATE_FILMS }, generateFilm);

  get films() {
    return this.#films;
  }

  get count() {
    return this.#films.length;
  }

  get filtered() {
    return ({
      [FILTER_TYPES.ALL]: () => this.#films,
      [FILTER_TYPES.WATCHLIST]: () => this.#films.filter((film) => film.userDetails.watchlist),
      [FILTER_TYPES.HISTORY]: () => this.#films.filter((film) => film.userDetails.alreadyWatched),
      [FILTER_TYPES.FAVORITES]: () => this.#films.filter((film) => film.userDetails.favorite),
    });
  }
}
