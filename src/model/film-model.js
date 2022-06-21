import { GENERATE_FILMS } from '../mock/mock-const.js';
import { FILTER_TYPES } from '../const.js';
import { generateFilm } from '../mock/film.js';
import Observable from '../framework/observable.js';

export default class FilmModel extends Observable {
  #filmsApiService = null;
  #films = Array.from({ length: GENERATE_FILMS }, generateFilm);

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then((films) => {
      console.log(films.map(this.#adaptToClient));
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"

      //   {
      //     "id": "0",
      //     "film_info": {
      //         "title": "A Tale Of A Little Bird On The Floor",
      //         "alternative_title": "Happiness Who Stole The Darkness",
      //         "total_rating": 9.2,
      //         "poster": "images/posters/the-great-flamarion.jpg",
      //         "age_rating": 21,
      //         "director": "Quentin Tarantino",
      //         "writers": [
      //             "Robert Rodrigues",
      //             "Quentin Tarantino",
      //             "Stephen King"
      //         ],
      //         "actors": [
      //             "Ralph Fiennes",
      //             "Edward Norton",
      //             "Harrison Ford",
      //             "Al Pacino",
      //             "Brad Pitt",
      //             "Gary Oldman",
      //             "Takeshi Kitano"
      //         ],
      //         "release": {
      //             "date": "2023-04-06T06:50:40.171Z",
      //             "release_country": "Finland"
      //         },
      //         "runtime": 115,
      //         "genre": [
      //             "Drama",
      //             "Horror",
      //             "Sci-Fi"
      //         ],
      //         "description": "Oscar-winning film, a war drama about two young people, true masterpiece where love and death are closer to heroes than their family, a film about a journey that heroes are about to make in finding themselves."
      //     },
      //     "user_details": {
      //         "watchlist": false,
      //         "already_watched": true,
      //         "watching_date": "2022-06-20T20:07:20.612Z",
      //         "favorite": false
      //     },
      //     "comments": [
      //         "1247655",
      //         "1247656",
      //         "1247657",
      //         "1247658",
      //         "1247659"
      //     ]
      // }
    });
  }

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
