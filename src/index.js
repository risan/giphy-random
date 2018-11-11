import axios from "axios";

/**
 * Get random gif from Giphy.
 *
 * @param {String} apiKey
 * @param {String} options.tag
 * @param {String} options.rating
 * @return {Object}
 */
const giphyRandom = async (apiKey, { tag, rating = "g" } = {}) => {
  const params = { api_key: apiKey, rating };

  if (tag) {
    params.tag = tag;
  }

  const { data } = await axios.get("https://api.giphy.com/v1/gifs/random", {
    params
  });

  return data;
};

export default giphyRandom;
