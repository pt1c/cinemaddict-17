import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../const.js';

const sortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SORT_TYPES.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPES.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPES.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  get template() {
    return sortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
