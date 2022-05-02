import {createElement} from '../render.js';

const filmContainerTemplate = () => '<div class="films-list__container">';

export default class FilmContainerView {
  #element = null;

  get template() {
    return filmContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
