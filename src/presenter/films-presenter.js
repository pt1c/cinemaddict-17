import { FILMS_PER_PAGE } from '../const.js';
import FilmBoardView from '../view/film-board.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view';
import CommentModel from '../model/comment-model.js';
import { render, remove } from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import { sortFilmsByRating, sortFilmsByDate } from '../utils/films.js';
import { FILTER_TYPES, SORT_TYPES, USER_ACTION, UPDATE_TYPE } from '../const.js';
import { filter } from '../utils/filters.js';

export default class FilmsPresenter {
  #filmBoardComponent = new FilmBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #emptyFilmComponent = null;

  #mainContainer = null;
  #commentModel = null;
  #filmModel = null;
  #filterModel = null;
  #renderedFilmsCount = FILMS_PER_PAGE;
  #filmPresenter = new Map();

  #presenterWithOpenedDetails = null;

  #currentSortType = SORT_TYPES.DEFAULT;
  #filterType = FILTER_TYPES.ALL;

  constructor(mainContainer, filmModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;

    //инициализирует комментарии
    this.#commentModel = new CommentModel();

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const filteredFilms = filter[this.#filterType](this.#filmModel.films);

    switch (this.#currentSortType) {
      case SORT_TYPES.RATING:
        return filteredFilms.sort(sortFilmsByRating);
      case SORT_TYPES.DATE:
        return filteredFilms.sort(sortFilmsByDate);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if (this.films.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    render(this.#filmBoardComponent, this.#mainContainer);
    this.#renderFilmsList();

    this.#updateDetailedFilm();
  };

  #renderFilmsList = () => {
    render(this.#filmListComponent, this.#filmBoardComponent.element);
    render(this.#filmContainerComponent, this.#filmListComponent.element);

    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount));

    this.#renderFilms(films);

    if (filmsCount > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmContainerComponent.element, this.#handleViewAction, this.#handleModeChange, this.#commentModel);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #updateDetailedFilm = () => {
    if (!this.#presenterWithOpenedDetails) {
      return;
    }

    if (!this.#presenterWithOpenedDetails.isDetailsOpen) {
      this.#presenterWithOpenedDetails = null;
    }

    const detailsData = this.#filmModel.films.find((film) => film.id === this.#presenterWithOpenedDetails?.filmId);
    if (detailsData) {
      this.#presenterWithOpenedDetails.init(detailsData);
    }
  };

  #clearFilmsBoard = ({ resetRenderedFilmCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => {
      if (presenter.isDetailsOpen) {
        presenter.destroy(true);
        this.#presenterWithOpenedDetails = presenter;
      } else {
        presenter.destroy();
      }
    });

    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyFilmComponent);
    remove(this.#filmListComponent);
    remove(this.#filmContainerComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmsCount = FILMS_PER_PAGE;
    } else {
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DEFAULT;
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#mainContainer);
  };

  #renderEmpty = () => {
    render(this.#filmBoardComponent, this.#mainContainer);

    this.#emptyFilmComponent = new FilmListEmptyView(this.#filterType);
    render(this.#emptyFilmComponent, this.#filmBoardComponent.element);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetFilmDetails());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.FILM_UPDATE:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case USER_ACTION.COMMENT_ADD:
        this.#commentModel.addComment(updateType, update);
        break;
      case USER_ACTION.COMMENT_DELETE:
        this.#commentModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearFilmsBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderFilmsBoard();
        break;
    }
  };

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILMS_PER_PAGE);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);

    this.#renderFilms(films);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsBoard({ resetRenderedTaskCount: true });
    this.#renderFilmsBoard();
  };
}
