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
import { updateItem } from '../utils/common.js';

export default class FilmsPresenter {
  #filmBoardComponent = new FilmBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButton = new ShowMoreButtonView();

  #mainContainer = null;
  #commentModel = null;
  #filmModel = null;
  #films = null;
  #originalFilms = null;
  #renderedFilmsCount = FILMS_PER_PAGE;
  #filmPresenter = new Map();

  constructor(mainContainer, filmModel) {
    this.#mainContainer = mainContainer;
    this.#filmModel = filmModel;

    //инициализирует комментарии
    this.#commentModel = new CommentModel();
  }

  init = () => {
    this.#films = [...this.#filmModel.films];
    this.#originalFilms = [...this.#filmModel.films];

    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if (this.#filmModel.count === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();

    render(this.#filmBoardComponent, this.#mainContainer);
    render(this.#filmListComponent, this.#filmBoardComponent.element);
    render(this.#filmContainerComponent, this.#filmListComponent.element);

    this.#renderFilms(0, Math.min(this.#films.length, FILMS_PER_PAGE));

    if (this.#filmModel.count > FILMS_PER_PAGE) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilms = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderFilm(film));
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmContainerComponent.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film, [...this.#commentModel.comments]);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, [...this.#commentModel.comments]);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetFilmDetails());
  };

  #handleShowMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_PER_PAGE)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_PER_PAGE;

    if (this.#renderedFilmsCount >= this.#filmModel.count) {
      remove(this.#showMoreButton);
    }
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmListComponent.element);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderSort = () => {
    render(new SortView(), this.#mainContainer);
  };

  #renderEmpty = () => {
    render(this.#filmBoardComponent, this.#mainContainer);
    render(new FilmListEmptyView(), this.#filmBoardComponent.element);
  };

}
