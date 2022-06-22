import AbstractView from '../framework/view/abstract-view.js';

const createLoadingTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
