import AbstractView from '../framework/view/abstract-view.js';

const statisticsTemplate = (filmsCount) => (`<p>${filmsCount} movies inside</p>`);

export default class StatisticsView extends AbstractView {
  #filmsCount = 0;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return statisticsTemplate(this.#filmsCount);
  }
}
