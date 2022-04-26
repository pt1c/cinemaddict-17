import FilmBoardView from '../view/film-board.js';
import FilmListView from '../view/film-list-view.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view';
import {render} from '../render.js';

export default class BoardPresenter {
  filmBoardComponent = new FilmBoardView();
  filmListComponent = new FilmListView();
  filmContainerComponent = new FilmContainerView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(new SortView(), this.mainContainer);

    render(this.filmBoardComponent, this.mainContainer);
    render(this.filmListComponent, this.filmBoardComponent.getElement());
    render(this.filmContainerComponent, this.filmListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmListComponent.getElement());
  };
}
