import ApiService from './framework/api-service.js';
import { Method } from './const.js';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  updateFilms = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const filmInfo = film.filmInfo;
    const userDetails = film.userDetails;

    const adaptedFilmInfo = {
      ...filmInfo,
      'alternative_title': filmInfo.alternativeTitle,
      'total_rating': filmInfo.totalRating,
      'age_rating': filmInfo.ageRating,

      release: {
        ...filmInfo.release,
        'release_country': filmInfo.release.releaseCountry
      }
    };

    delete adaptedFilmInfo.alternativeTitle;
    delete adaptedFilmInfo.totalRating;
    delete adaptedFilmInfo.ageRating;
    delete adaptedFilmInfo.release.releaseCountry;

    const adaptedUserDetails = {
      ...userDetails,
      'already_watched': userDetails.alreadyWatched,
      'watching_date': userDetails.watchingDate,
    };

    delete adaptedUserDetails.alreadyWatched;
    delete adaptedUserDetails.watchingDate;

    const adaptedFilm = {
      ...film,
      comments: film.commentsIds,
      'film_info': adaptedFilmInfo,
      'user_details': adaptedUserDetails,
    };

    delete adaptedFilm.commentsIds;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  };
}
