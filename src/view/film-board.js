import AbstractView from '../framework/view/abstract-view.js';

const filmBoardTemplate = () => '<section class="films"></section>';

export default class FilmBoardView extends AbstractView {
  get template() {
    return filmBoardTemplate();
  }
}
