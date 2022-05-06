import AbstractView from '../framework/view/abstract-view.js';

const statisticsTemplate = () => '<p>130 291 movies inside</p>';

export default class StatisticsView extends AbstractView {
  get template() {
    return statisticsTemplate();
  }
}
