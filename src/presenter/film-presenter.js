import { render, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmPresenter {

  #filmContainerElement = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;

  #film = null;
  #filmComments = null;

  #changeDataCallback = null;

  constructor(filmContainerElement, changeDataCallback) {
    this.#filmContainerElement = filmContainerElement;
    this.#changeDataCallback = changeDataCallback;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#filmComments = comments;

    this.#filmCardComponent = new FilmCardView(this.#film);
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#filmComments);

    this.#filmCardComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    // this.#popupComponent.setFavoriteClickHandler(this.#onFavoriteClick);
    // this.#popupComponent.setWatchlistClickHandler(this.#onWatchListClick);
    // this.#popupComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);

    this.#filmCardComponent.setClickHandler(this.#openFilmDetails);

    render(this.#filmCardComponent, this.#filmContainerElement);

    //this.#changeModeCb = changeModeCb;
  };

  #openFilmDetails = () => {
    render(this.#filmDetailsComponent, document.body);

    this.#filmDetailsComponent.setCloseClickHandler(this.#closeFilmDetails);

    //this.#changeMode();
    //this.#mode = Mode.OPENED;

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #closeFilmDetails = () => {
    remove(this.#filmDetailsComponent);

    //this.#mode = Mode.CLOSED;

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
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
