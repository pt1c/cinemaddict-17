import {MAX_DESCRIPTION_LENGTH} from '../const.js';
import {createElement} from '../render.js';
import {humanizeRuntime, chopString} from '../utils.js';
import dayjs from 'dayjs';

const filmCardTemplate = (film) => {
  const { filmInfo, comments, userDetails } = film;

  const { title, totalRating, poster, runtime, genre, description, release } = filmInfo;
  const duration = humanizeRuntime(runtime) || '';
  const releaseYear = dayjs(release.date).year();
  const formatedDescription = chopString(description, MAX_DESCRIPTION_LENGTH, '…');

  const commentsCount = comments.length;

  const isControlActive = (value) => (value) ? ' film-card__controls-item--active' : '';
  const { watchlist, alreadyWatched, favorite} = userDetails;
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

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return filmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
