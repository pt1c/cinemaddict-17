import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = (filmsCount) => (`<p>${filmsCount} movies inside</p>`);

export default class StatisticsView extends AbstractView {
  #filmsCount = 0;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createStatisticsTemplate(this.#filmsCount);
  }
}
