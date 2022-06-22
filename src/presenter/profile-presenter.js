import UserProfileView from '../view/user-profile-view.js';
import { getRank } from '../utils/user-profile.js';
import { remove, render, replace } from '../framework/render.js';

export default class ProfilePresenter {

  #filmModel = null;
  #profileContainer = null;
  #profileComponent = null;
  #film = [];

  constructor(profileContainer, filmModel) {
    this.#profileContainer = profileContainer;
    this.#filmModel = filmModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#film = this.#filmModel.films;
    const rank = getRank(this.#film);

    if (rank) {
      this.#renderProfile(rank);
      return;
    }

    remove(this.#profileComponent);
    this.#profileComponent = null;
  };

  #renderProfile = (rank) => {
    const prevProfileComponent = this.#profileComponent;
    this.#profileComponent = new UserProfileView(rank);

    if (prevProfileComponent === null) {
      render(this.#profileComponent, this.#profileContainer);
      return;
    }

    replace(this.#profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
