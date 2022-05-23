import { MAX_DESCRIPTION_LENGTH } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeRuntime, chopString } from '../utils.js';
import dayjs from 'dayjs';

const filmCardTemplate = (film) => {
  const { filmInfo, comments, userDetails } = film;

  const { title, totalRating, poster, runtime, genre, description, release } = filmInfo;
  const duration = humanizeRuntime(runtime) || '';
  const releaseYear = dayjs(release.date).year();
  const formatedDescription = chopString(description, MAX_DESCRIPTION_LENGTH, '…');

  const commentsCount = comments.length;

  const isControlActive = (value) => (value) ? ' film-card__controls-item--active' : '';
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const watchlistActive = isControlActive(watchlist);
  const alreadyWatchedActive = isControlActive(alreadyWatched);
  const favoriteActive = isControlActive(favorite);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${formatedDescription}</p>
        <span class="film-card__comments">${commentsCount} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist${watchlistActive}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched${alreadyWatchedActive}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite${favoriteActive}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  get template() {
    return filmCardTemplate(this.film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.toWatchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.toWatchListClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
