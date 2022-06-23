import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import he from 'he';
import AbstractView from '../framework/view/abstract-view.js';

const filmDetailsCommentTemplate = (comment, deletingCommentId) => {
  const { author, emotion, date, id, isDisabled } = comment;

  const getEmoctionPicture = (`./images/emoji/${emotion}.png`);
  const commentText = comment.comment;
  const commentDate = dayjs().to(dayjs(date));

  return (
    `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${getEmoctionPicture}" width="55" height="55" alt="emoji-${emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(String(commentText))}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${commentDate}</span>
              <button class="film-details__comment-delete" data-button-id="${id}" ${isDisabled ? 'disabled' : ''}>
                ${deletingCommentId === id ? 'Deleting...' : 'Delete'}
              </button>
            </p>
          </div>
        </li>`
  );
};

dayjs.extend(relativeTime);

export default class FilmDetailsCommentView extends AbstractView {
  constructor(comment, deletingCommentId) {
    super();
    this.comment = comment;
    this.deletingCommentId = deletingCommentId;
  }

  get template() {
    return filmDetailsCommentTemplate(this.comment, this.deletingCommentId);
  }
}
