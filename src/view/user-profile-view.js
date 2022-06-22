import AbstractView from '../framework/view/abstract-view.js';

const createProfileTemplate = (userRating) => (`
  <section class="header__profile profile">
    <p class="profile__rating">${userRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`);

export default class UserProfileView extends AbstractView {

  #userRating = null;

  constructor(userRating) {
    super();
    this.#userRating = userRating;
  }

  get template() {
    return createProfileTemplate(this.#userRating);
  }
}
