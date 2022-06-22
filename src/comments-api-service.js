import { METHOD } from './const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {
  getComments(filmId) {
    return this._load({ url: `${'comments'}/${filmId}` })
      .then(ApiService.parseResponse);
  }

  addComment = async (comment, filmId) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: METHOD.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return await parsedResponse;
  };

  deleteComment = async (id) => {
    const response = await this._load({
      url: `comments/${id}`,
      method: METHOD.DELETE,
    });

    return await response;
  };

}
