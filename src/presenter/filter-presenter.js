import FilterView from '../view/filter-view.js';
import { render, remove, replace } from '../framework/render.js';
import { filter } from '../utils/filters.js';
import { FilterType, FilterName, UpdateType } from '../const.js';

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
        type: FilterType.ALL,
        name: FilterName[FilterType.ALL],
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: FilterName[FilterType.WATCHLIST],
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: FilterName[FilterType.HISTORY],
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: FilterName[FilterType.FAVORITES],
        count: filter[FilterType.FAVORITES](films).length,
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

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
