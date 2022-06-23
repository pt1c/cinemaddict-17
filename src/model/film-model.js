import { FilterType, UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class FilmModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

  get films() {
    return this.#films;
  }

  get count() {
    return this.#films.length;
  }

  get filtered() {
    return ({
      [FilterType.ALL]: () => this.#films,
      [FilterType.WATCHLIST]: () => this.#films.filter((film) => film.userDetails.watchlist),
      [FilterType.HISTORY]: () => this.#films.filter((film) => film.userDetails.alreadyWatched),
      [FilterType.FAVORITES]: () => this.#films.filter((film) => film.userDetails.favorite),
    });
  }

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#filmsApiService.updateFilms(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];

      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update films');
    }
  };

  #adaptToClient = (film) => {
    const filmInfo = film.film_info;
    const userDetails = film.user_details;

    const adaptedFilmInfo = {
      ...filmInfo,
      alternativeTitle: filmInfo.alternative_title,
      totalRating: filmInfo.total_rating,
      ageRating: filmInfo.age_rating,

      release: {
        ...filmInfo.release,
        releaseCountry: filmInfo.release.release_country
      }
    };

    delete adaptedFilmInfo.alternative_title;
    delete adaptedFilmInfo.total_rating;
    delete adaptedFilmInfo.age_rating;
    delete adaptedFilmInfo.release.release_country;

    const adaptedUserDetails = {
      ...userDetails,
      alreadyWatched: userDetails.already_watched,
      watchingDate: userDetails.watching_date,
    };

    delete adaptedUserDetails.already_watched;
    delete adaptedUserDetails.watching_date;

    const adaptedFilm = {
      ...film,
      commentsIds: film.comments,
      filmInfo: adaptedFilmInfo,
      userDetails: adaptedUserDetails,
    };

    delete adaptedFilm.comments;
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  };
}
