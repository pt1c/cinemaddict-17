import {createElement} from '../render.js';

const filmContainerTemplate = () => '<div class="films-list__container">';

export default class FilmContainerView {
  getTemplate() {
    return filmContainerTemplate();
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
