import AbstractView from '../framework/view/abstract-view.js';

const filmContainerTemplate = () => '<div class="films-list__container">';

export default class FilmContainerView extends AbstractView {
  get template() {
    return filmContainerTemplate();
  }
}
