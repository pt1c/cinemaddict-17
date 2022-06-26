import { FILMS_PER_PAGE } from '../const.js';
import FilmBoardView from '../view/film-board.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view';
import LoadingView from '../view/loading-view.js';
import FilmsExtraContainerView from '../view/films-extra-container-view.js';
import { render, remove } from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import { sortFilmsByRating, sortFilmsByDate, getTopRatedFilms, getMostCommentedFilms } from '../utils/films.js';
import { FilterType, SortType, UserAction, UpdateType, FilmsExtraSectionText } from '../const.js';
import { filter } from '../utils/filters.js';

export default class FilmsPresenter {
  #filmBoardComponent = new FilmBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #emptyFilmComponent = null;
  #loadingComponent = new LoadingView();

  #mainContainer = null;
  #filmModel = null;
  #filterModel = null;
  #renderedFilmsCount = FILMS_PER_PAGE;
  #filmPresenter = new Map();

  #presenterWithOpenedDetails = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  #filmsExtraContainerComponents = new Map();

  constructor(mainContainer, filmModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const filteredFilms = filter[this.#filterType](this.#filmModel.films);

    switch (this.#currentSortType) {
      case SortType.RATING:
        return filteredFilms.sort(sortFilmsByRating);
      case SortType.DATE:
        return filteredFilms.sort(sortFilmsByDate);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.films.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    render(this.#filmBoardComponent, this.#mainContainer);
    this.#renderFilmsList();

    this.#updateDetailedFilm();

    this.#clearExtraFilms();
    this.#renderExtraFilms();
  };

  #renderFilmsList = () => {
    render(this.#filmListComponent, this.#filmBoardComponent.element);
    render(this.#filmContainerComponent, this.#filmListComponent.element);

    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILMS_PER_PAGE));

    this.#renderFilms(films);

    if (filmsCount > FILMS_PER_PAGE) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderFilm = (film, element = this.#filmContainerComponent.element) => {
    const filmPresenter = new FilmPresenter(element, this.#handleViewAction, this.#handleModeChange);
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

  #clearFilmsBoard = ({ resetSortType = false } = {}) => {
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
    remove(this.#loadingComponent);

    this.#renderedFilmsCount = Math.min(filmsCount, FILMS_PER_PAGE);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
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

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainContainer);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetFilmDetails());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.FILM_UPDATE:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case UserAction.COMMENT_ADD:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case UserAction.COMMENT_DELETE:
        this.#filmModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsBoard({ resetSortType: true });
        this.#renderFilmsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    this.#clearFilmsBoard();
    this.#renderFilmsBoard();
  };

  #renderExtraFilms = () => {
    const extraFilms = {
      TOP_RATED: getTopRatedFilms(this.films),
      MOST_COMMENTED: getMostCommentedFilms(this.films)
    };

    Object.entries(extraFilms).forEach(([key, value]) => {
      if (!value.length) {
        return;
      }

      const filmExtraContainerComponent = new FilmsExtraContainerView(FilmsExtraSectionText[key]);
      this.#filmsExtraContainerComponents.set(FilmsExtraSectionText[key], filmExtraContainerComponent);

      render(filmExtraContainerComponent, this.#filmBoardComponent.element);
      value.forEach((film) => {
        this.#renderFilm(film, filmExtraContainerComponent.contentWrapper);
      });
    });
  };

  #clearExtraFilms = () => {
    this.#filmsExtraContainerComponents.forEach(remove);
    this.#filmsExtraContainerComponents.clear();
  };
}
