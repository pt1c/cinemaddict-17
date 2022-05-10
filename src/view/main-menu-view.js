import { FILTER_TYPES, FILTER_NAMES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class MainMenuView extends AbstractView {
  #filters = null;
  #active = null;

  constructor(filters, active) {
    super();
    this.#filters = filters;
    this.#active = active;
  }

  get template() {
    const filterItemsTemplate = Object.entries(this.#filters)
      .map(([name, func]) => this.#generateFilterTemplate(
        {
          name: name,
          title: FILTER_NAMES[name],
          count: (name !== FILTER_TYPES.ALL) ? func().length : ''
        }, this.#active))
      .join('');

    return (
      `<nav class="main-navigation">
        ${filterItemsTemplate}
      </nav>`
    );
  }

  #generateFilterTemplate = (filter, active) => {
    const activeClass = (active === filter.name) ? ' main-navigation__item--active' : '';
    const filmCount = (filter.count) ? ` <span class="main-navigation__item-count">${filter.count}</span>` : '';
    return `<a href="#${filter.name}" class="main-navigation__item${activeClass}">${filter.title}${filmCount}</a>`;
  };
}
