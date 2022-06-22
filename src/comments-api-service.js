import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {
  getComments(movieId) {
    return this._load({ url: `${'comments'}/${movieId}` })
      .then(ApiService.parseResponse);
  }
}
