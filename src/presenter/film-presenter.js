import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { USER_ACTION, UPDATE_TYPE } from '../const.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class FilmPresenter {

  #filmContainerElement = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;

  #film = null;

  #mode = Mode.CLOSED;

  #changeDataCallback = null;
  #changeModeCallback = null;

  #commentModel = null;

  constructor(filmContainerElement, changeDataCallback, changeModeCallback, commentModel) {
    this.#filmContainerElement = filmContainerElement;
    this.#changeDataCallback = changeDataCallback;
    this.#changeModeCallback = changeModeCallback;
    this.#commentModel = commentModel;
  }

  init = (film) => {
    this.#film = { ...film, comments: [...this.#commentModel.getCommentsByIds(film.comments)] };

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmDetailsComponent = new FilmDetailsView(this.#film);

    this.#filmCardComponent.setClickHandler(this.#openFilmDetails);
    this.#filmCardComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmContainerElement);
      return;
    }

    if (this.#filmContainerElement.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
      this.#initDetailsHandlers();
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  };

  get isDetailsOpen() {
    return this.#mode === Mode.OPENED;
  }

  get filmId() {
    return this.#film.id;
  }

  #initDetailsHandlers = () => {
    this.#filmDetailsComponent.setCloseClickHandler(this.#closeFilmDetails);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#onFavoriteClick);
  };

  #openFilmDetails = () => {
    this.#changeModeCallback();
    this.#mode = Mode.OPENED;

    render(this.#filmDetailsComponent, document.body);

    this.#initDetailsHandlers();
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #closeFilmDetails = () => {
    remove(this.#filmDetailsComponent);
    this.#filmDetailsComponent.reset();

    this.#mode = Mode.CLOSED;

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };

  resetFilmDetails = () => {
    if (this.#mode !== Mode.CLOSED) {
      this.#closeFilmDetails();
    }
  };

  #onWatchListClick = () => {
    this.#changeDataCallback(
      USER_ACTION.FILM_UPDATE,
      UPDATE_TYPE.MINOR,
      { ...this.#film, userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist } });
  };

  #onAlreadyWatchedClick = () => {
    this.#changeDataCallback(
      USER_ACTION.FILM_UPDATE,
      UPDATE_TYPE.MINOR,
      { ...this.#film, userDetails: { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched } });
  };

  #onFavoriteClick = () => {
    this.#changeDataCallback(
      USER_ACTION.FILM_UPDATE,
      UPDATE_TYPE.MINOR,
      { ...this.#film, userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite } });
  };

  destroy = (cardOnly = false) => {
    remove(this.#filmCardComponent);

    if (!cardOnly) {
      remove(this.#filmDetailsComponent);
    }
  };
}
