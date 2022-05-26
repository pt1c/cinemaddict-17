import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class FilmPresenter {

  #filmContainerElement = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;

  #film = null;
  #filmComments = null;

  #mode = Mode.CLOSED;

  #changeDataCallback = null;
  #changeModeCallback = null;

  constructor(filmContainerElement, changeDataCallback, changeModeCallback) {
    this.#filmContainerElement = filmContainerElement;
    this.#changeDataCallback = changeDataCallback;
    this.#changeModeCallback = changeModeCallback;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#filmComments = comments;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#filmComments);

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
    this.#changeDataCallback({ ...this.#film, userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist } });
  };

  #onAlreadyWatchedClick = () => {
    this.#changeDataCallback({ ...this.#film, userDetails: { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched } });
  };

  #onFavoriteClick = () => {
    this.#changeDataCallback({ ...this.#film, userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite } });
  };

}
