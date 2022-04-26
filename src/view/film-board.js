import {createElement} from '../render.js';

const filmBoardTemplate = () => '<section class="films"></section>';

export default class FilmBoardView {
  getTemplate() {
    return filmBoardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
