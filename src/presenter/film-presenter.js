import { UserAction, UpdateType, END_POINT, AUTHORIZATION, TimeLimit } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import CommentModel from '../model/comment-model.js';
import CommentsApiService from '../comments-api-service.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

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

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(filmContainerElement, changeDataCallback, changeModeCallback) {
    this.#filmContainerElement = filmContainerElement;
    this.#changeDataCallback = changeDataCallback;
    this.#changeModeCallback = changeModeCallback;

    this.#commentModel = new CommentModel(new CommentsApiService(END_POINT, AUTHORIZATION));
    this.#commentModel.addObserver(this.#handleCommentModelChange);
  }

  get isDetailsOpen() {
    return this.#mode === Mode.OPENED;
  }

  get filmId() {
    return this.#film.id;
  }

  init = (film) => {
    this.#film = { ...film, comments: this.#commentModel?.comments || [] };

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

  #initDetailsHandlers = () => {
    this.#filmDetailsComponent.setCloseClickHandler(this.#closeFilmDetails);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#filmDetailsComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    this.#filmDetailsComponent.setAddCommentHandler(this.#handleAddComment);
    this.#filmDetailsComponent.setDeleteCommentHandler(this.#handleDeleteComment);
  };

  #openFilmDetails = async () => {
    await this.#commentModel.init(this.#film.id);
    const comments = this.#commentModel.comments;
    this.#filmDetailsComponent = new FilmDetailsView({ ...this.#film, comments });

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
      UserAction.FILM_UPDATE,
      UpdateType.MINOR,
      { ...this.#film, userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist } });
  };

  #onAlreadyWatchedClick = () => {
    this.#changeDataCallback(
      UserAction.FILM_UPDATE,
      UpdateType.MINOR,
      { ...this.#film, userDetails: { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched } });
  };

  #onFavoriteClick = () => {
    this.#changeDataCallback(
      UserAction.FILM_UPDATE,
      UpdateType.MINOR,
      { ...this.#film, userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite } });
  };

  #handleAddComment = async (film, newComment) => {
    this.#uiBlocker.block();
    this.setSaving();
    try {
      await this.#commentModel.addComment(newComment, film.id);
    } catch (err) {
      this.setAborting();
      this.setAbortingAddComment();
    }
    this.#uiBlocker.unblock();
  };

  #handleDeleteComment = async (update) => {
    this.#uiBlocker.block();
    this.setDeleting(update);
    try {
      await this.#commentModel.deleteComment(update);
    } catch (err) {
      this.setAborting();
    }
    this.#uiBlocker.unblock();
  };

  setSaving = () => {
    this.#filmDetailsComponent.updateElement({
      isSaving: true,
      isDisabled: true,
    });
  };

  setDeleting = (commentId) => {
    this.#filmDetailsComponent.updateElement({
      deletingCommentId: commentId,
      isDeleting: true,
      isDisabled: true,
    });
  };

  setAborting = () => {
    if (this.#mode === Mode.CLOSED) {
      this.#filmDetailsComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#filmDetailsComponent.updateElement({
        isDisabled: false,
        isDeleting: false,
        isSaving: false,
      });
    };

    this.#filmDetailsComponent.shake(resetFormState);
  };

  setAbortingAddComment = () => {
    this.#filmDetailsComponent.updateElement({
      abortingFormSubmit: true
    });
  };

  #handleCommentModelChange = (updateType) => {
    switch (updateType) {
      case UserAction.COMMENT_ADD:
        this.#changeDataCallback(
          UserAction.COMMENT_ADD,
          UpdateType.MINOR,
          this.#film
        );
        break;
      case UserAction.COMMENT_DELETE:
        this.#changeDataCallback(
          UserAction.COMMENT_DELETE,
          UpdateType.MINOR,
          this.#film
        );
        break;
    }
  };

  destroy = (cardOnly = false) => {
    remove(this.#filmCardComponent);

    if (!cardOnly) {
      remove(this.#filmDetailsComponent);
    }
  };
}
