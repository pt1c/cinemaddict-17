import Observable from '../framework/observable.js';

export default class CommentModel extends Observable {
  #comments = [];

  get comments() {
    return this.#comments;
  }

  getCommentsByIds = (ids) => this.#comments.filter((comment) => ids.includes(comment.id));
}
