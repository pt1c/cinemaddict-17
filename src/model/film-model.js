import { GENERATE_FILMS } from '../mock/mock-const.js';
import { generateFilm } from '../mock/film.js';

export default class FilmModel {
  #films = Array.from({ length: GENERATE_FILMS }, generateFilm);

  get films() {
    return this.#films;
  }

  get count() {
    return this.#films.length;
  }
}
