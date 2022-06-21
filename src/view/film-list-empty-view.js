import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../const.js';

const EMPTY_TEXTS = {
  [FILTER_TYPES.ALL]: 'There are no movies in our database',
  [FILTER_TYPES.WATCHLIST]: 'There are no movies to watch now',
  [FILTER_TYPES.HISTORY]: 'There are no watched movies now',
  [FILTER_TYPES.FAVORITES]: 'There are no favorite movies now',
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
