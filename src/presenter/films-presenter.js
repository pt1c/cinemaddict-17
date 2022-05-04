import FilmBoardView from '../view/film-board.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmDetailsView from '../view/film-details-view.js';
import CommentModel from '../model/comment-model.js';
import {render} from '../render.js';

export default class FilmsPresenter {
  #filmBoardComponent = new FilmBoardView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmContainerView();

  #mainContainer = null;
  #commentModel = null;
  #filmModel = null;
  #filmDetails = null;
  #films = null;

  init = (mainContainer, filmModel) => {
    this.#mainContainer = mainContainer;
    this.#filmModel = filmModel;
    this.#films = [...this.#filmModel.films];

    //инициализирует комментарии
    this.#commentModel = new CommentModel();

    render(new SortView(), this.#mainContainer);

    render(this.#filmBoardComponent, this.#mainContainer);
    render(this.#filmListComponent, this.#filmBoardComponent.element);
    render(this.#filmContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(new ShowMoreButtonView(), this.#filmListComponent.element);
  };

  #renderFilm = (film) => {
    const filmInstance = new FilmCardView(film);

    render(filmInstance, this.#filmContainerComponent.element);

    const closeFilmDetails = () => {
      this.#filmDetails.element.querySelector('.film-details__close-btn').removeEventListener('click', closeFilmDetails);
      document.removeEventListener('keydown', onEscKeyDown);

      this.#mainContainer.removeChild(this.#filmDetails.element);
      this.#filmDetails = null;
      document.body.classList.remove('hide-overflow');
    };

    const openFilmDetails = () => {
      if (this.#filmDetails) {
        return;
      }

      this.#filmDetails = new FilmDetailsView(film, [...this.#commentModel.comments]);
      this.#mainContainer.appendChild(this.#filmDetails.element);

      this.#filmDetails.element.querySelector('.film-details__close-btn').addEventListener('click', closeFilmDetails);
      document.addEventListener('keydown', onEscKeyDown);
      document.body.classList.add('hide-overflow');
    };

    function onEscKeyDown(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeFilmDetails();
      }
    }

    filmInstance.element.querySelector('.film-card__link').addEventListener('click', () => {
      openFilmDetails();
    });
  };

}
