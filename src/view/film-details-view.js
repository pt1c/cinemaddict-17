
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeRuntime, humanizeReleaseDate } from '../utils/common.js';
import FilmDetailsCommentView from './film-details-comment-view.js';

const createfilmDetailsTemplate = (film) => {
  const { filmInfo, userDetails } = film;

  const { title, alternativeTitle, totalRating, poster, director, genre, description, release } = filmInfo;
  const ageRating = `${filmInfo.ageRating}+`;
  const writers = filmInfo.writers.join(', ');
  const actors = filmInfo.actors.join(', ');
  const country = release.releaseCountry;
  const releaseDate = humanizeReleaseDate(release.date);
  const runtime = humanizeRuntime(filmInfo.runtime) || '';
  const genresTitle = (genre.length > 1) ? 'Genres' : 'Genre';
  const genresBody = genre.map((element) => (`<span class="film-details__genre">${element}</span>`)).join('\n');

  const isControlActive = (value) => (value) ? ' film-details__control-button--active' : '';
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const watchlistActive = isControlActive(watchlist);
  const alreadyWatchedActive = isControlActive(alreadyWatched);
  const favoriteActive = isControlActive(favorite);

  const commentsCount = film.comments.length;
  let commentsItems = '';
  film.comments.forEach((comment) => {
    commentsItems += new FilmDetailsCommentView(comment, film?.deletingCommentId).template;
  });

  const showSmile = () => (film.smileName) ? `<img src="./images/emoji/${film.smileName}.png" width="55" height="55" alt="emoji-${film.smileName}">` : '';
  const isSmileChecked = (smileName) => smileName === film.smileName ? 'checked' : '';

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genresTitle}</td>
                <td class="film-details__cell">
                  ${genresBody}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist${watchlistActive}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched${alreadyWatchedActive}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite${favoriteActive}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsItems}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${showSmile()}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isSmileChecked('smile')}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isSmileChecked('sleeping')}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isSmileChecked('puke')}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isSmileChecked('angry')}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film);

    this.#setInnerHandlers();
  }

  get template() {
    return createfilmDetailsTemplate(this._state);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.toWatchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.toWatchListClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      newComment: evt.target.value,
    });
  };

  #smileChangeHandler = (evt) => {
    if (evt.target.nodeName === 'INPUT') {
      evt.preventDefault();
      const scrollPosition = this.element.scrollTop;
      this.updateElement({
        smileName: evt.target.value,
      });
      this.element.scrollTop = scrollPosition;
    }
  };

  setAddCommentHandler = (callback) => {
    this._callback.addComment = callback;
    document.addEventListener('keydown', this.#onAddComment);
  };

  #onAddComment = (evt) => {
    const scrollPosition = this.element.scrollTop;
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();
      this._callback.addComment(FilmDetailsView.parseStateToFilm(this._state), FilmDetailsView.setNewComment(this._state));
    }
    this.element.scrollTop = scrollPosition;
  };

  setDeleteCommentHandler = (callback) => {
    this._callback.deleteComment = callback;

    const deleteButtons = this.element.querySelectorAll('.film-details__comment-delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', this.#onCommentDelete);
    });
  };

  #onCommentDelete = (evt) => {
    evt.preventDefault();
    const scrollPosition = this.element.scrollTop;
    const isDeleteButton = evt.target.dataset.buttonId;

    let commentId = null;

    const index = this._state.comments.findIndex((item) => item.id === isDeleteButton);

    if (index !== -1) {
      commentId = this._state.comments[index].id;
    }

    this._callback.deleteComment(commentId);

    this.updateElement({
      ...this._state
    });

    this.element.scrollTop = scrollPosition;
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#smileChangeHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setWatchlistClickHandler(this._callback.toWatchListClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteCommentHandler(this._callback.deleteComment);
    this.setAddCommentHandler(this._callback.addComment);
  };

  reset = (film) => {
    this.updateElement(
      FilmDetailsView.parseFilmToState(film),
    );
  };


  static parseFilmToState = (film) => (
    {
      ...film,
      smileName: null,
      newComment: null,
      isDisabled: false,
      isDeleting: false,
      isSaving: false,
    }
  );

  static parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.smileName;
    delete film.newComment;
    delete film.isDeleting;
    delete film.isDisabled;
    delete film.isSaving;

    return film;
  };

  static setNewComment = (state) => ({
    emotion: state.smileName || 'smile',
    comment: state.newComment,
  });

}
