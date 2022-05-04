import {GENERATE_COMMENTS} from '../mock/mock-const.js';
import {generateComment} from '../mock/comment.js';

export default class FilmModel {
  #comments = Array.from({length: GENERATE_COMMENTS}, generateComment);

  get comments(){
    return this.#comments;
  }
}
