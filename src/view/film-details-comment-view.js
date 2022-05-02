import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import {createElement} from '../render.js';

const filmDetailsCommentTemplate = (comment) => {
  const { author, emotion, date } = comment;
  const getEmoctionPicture = (`./images/emoji/${emotion}.png`);
  const commentText = comment.comment;
  const commentDate = dayjs().to(dayjs(date));
  //date

  return (
    `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${getEmoctionPicture}" width="55" height="55" alt="emoji-${emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${commentText}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${commentDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
  );
};

export default class FilmDetailsCommentView {
  #element = null;

  constructor(comment){
    this.comment = comment;
  }

  get template() {
    return filmDetailsCommentTemplate(this.comment);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
