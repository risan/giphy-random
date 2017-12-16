import axios from 'axios';

export default class GiphyRandom {
  static get URI() {
    return 'https://api.giphy.com/v1/gifs/random';
  }

  constructor({ apiKey, defaultRating = 'G', uri = GiphyRandom.URI } = {}) {
    if (!apiKey) {
      throw new Error('The apiKey parameter is required.');
    }

    this.apiKey = apiKey;
    this.defaultRating = defaultRating;
    this.uri = uri;
  }

  get({ tag, rating = this.defaultRating } = {}) {
    const params = tag
      ? { api_key: this.apiKey, tag, rating }
      : { api_key: this.apiKey, rating };

    return new Promise((resolve, reject) => {
      axios
        .get(this.uri, { params })
        .then(response => resolve(response.data.data))
        .catch(error => reject(GiphyRandom.castToError(error)));
    });
  }

  static castToError(error) {
    if (error.response) {
      const { msg, status } = error.response.data.meta;

      return new Error(
        `Failed requesting random GIF from Giphy: [${status}] ${msg}`
      );
    }

    if (error.request) {
      return new Error(
        'Failed requesting random GIF from Giphy, no response was received.'
      );
    }

    return error;
  }
}
