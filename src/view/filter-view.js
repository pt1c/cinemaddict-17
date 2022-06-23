import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #active = null;

  constructor(filters, active) {
    super();
    this.#filters = filters;
    this.#active = active;
  }

  get template() {
    const filterItemsTemplate = this.#filters.map((filter) => this.#generateFilterTemplate(filter)).join('');

    return (
      `<nav class="main-navigation">
        ${filterItemsTemplate}
      </nav>`
    );
  }

  #generateFilterTemplate = (filter) => {
    const activeClass = (this.#active === filter.type) ? ' main-navigation__item--active' : '';
    const filmCount = (filter.count) ? ` <span class="main-navigation__item-count">${filter.count}</span>` : '';
    return `<a href="#${filter.type}" class="main-navigation__item${activeClass}" data-filter="${filter.type}">${filter.name}
    ${filter.type === FilterType.ALL ? '' : filmCount}</a>`;
  };

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.classList.contains('main-navigation__item-count')) {
      this._callback.filterTypeChange(evt.target.parentNode.dataset.filter);
      return;
    }

    if (evt.target.classList.contains('main-navigation__item')) {
      this._callback.filterTypeChange(evt.target.dataset.filter);
    }
  };
}
