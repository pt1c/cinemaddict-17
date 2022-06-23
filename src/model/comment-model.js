import { UserAction } from '../const.js';
import Observable from '../framework/observable.js';

export default class CommentModel extends Observable {
  #commentsApiService = null;
  #filmId = null;
  #comments = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (filmId) => {
    this.#filmId = filmId;

    try {
      this.#comments = await this.#commentsApiService.getComments(this.#filmId);
    } catch (err) {
      this.#comments = [];
    }
  };

  addComment = async (newComment, filmId) => {
    try {
      const response = await this.#commentsApiService.addComment(newComment, filmId);
      this.#comments = response.comments;

      this._notify(UserAction.COMMENT_ADD);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (id) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(id);

      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

      this._notify(UserAction.COMMENT_DELETE);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  };

}
