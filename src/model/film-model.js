import { GENERATE_FILMS } from '../mock/mock-const.js';
import { FILTER_TYPES } from '../const.js';
import { generateFilm } from '../mock/film.js';
import Observable from '../framework/observable.js';

export default class FilmModel extends Observable {
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

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
