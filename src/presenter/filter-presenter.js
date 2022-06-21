import FilterView from '../view/filter-view.js';
import { render, remove, replace } from '../framework/render.js';
import { filter } from '../utils/filters.js';
import { FILTER_TYPES, FILTER_NAMES, UPDATE_TYPE } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmModel = null;

  #filterComponent = null;

  constructor(mainContainer, filterModel, filmModel) {
    this.#filterContainer = mainContainer;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmModel.films;

    return [
      {
        type: FILTER_TYPES.ALL,
        name: FILTER_NAMES[FILTER_TYPES.ALL],
        count: filter[FILTER_TYPES.ALL](films).length,
      },
      {
        type: FILTER_TYPES.WATCHLIST,
        name: FILTER_NAMES[FILTER_TYPES.WATCHLIST],
        count: filter[FILTER_TYPES.WATCHLIST](films).length,
      },
      {
        type: FILTER_TYPES.HISTORY,
        name: FILTER_NAMES[FILTER_TYPES.HISTORY],
        count: filter[FILTER_TYPES.HISTORY](films).length,
      },
      {
        type: FILTER_TYPES.FAVORITES,
        name: FILTER_NAMES[FILTER_TYPES.FAVORITES],
        count: filter[FILTER_TYPES.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const prevMenuComponentComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevMenuComponentComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevMenuComponentComponent);
    remove(prevMenuComponentComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
