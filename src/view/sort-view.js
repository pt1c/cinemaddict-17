import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../const.js';

const sortTemplate = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SORT_TYPES.DEFAULT}" class="sort__button ${currentSortType === SORT_TYPES.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SORT_TYPES.DATE}" class="sort__button ${currentSortType === SORT_TYPES.DATE ? 'sort__button--active' : ''}">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SORT_TYPES.RATING}" class="sort__button ${currentSortType === SORT_TYPES.RATING ? 'sort__button--active' : ''}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return sortTemplate(this.#currentSortType);
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
