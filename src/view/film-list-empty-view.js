import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const EMPTY_TEXTS = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const filmListEmptyTemplate = (filterType) => (
  `<section class="films-list">
     <h2 class="films-list__title">${EMPTY_TEXTS[filterType]}</h2>
  </section>`
);

export default class FilmListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return filmListEmptyTemplate(this.#filterType);
  }
}
