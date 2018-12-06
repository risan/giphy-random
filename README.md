# Giphy Random

[![Build Status](https://badgen.net/travis/risan/giphy-random)](https://travis-ci.org/risan/giphy-random)
[![Test Covarage](https://badgen.net/codecov/c/github/risan/giphy-random)](https://codecov.io/gh/risan/giphy-random)
[![Greenkeeper](https://badges.greenkeeper.io/risan/giphy-random.svg)](https://greenkeeper.io)
[![Latest Version](https://badgen.net/npm/v/giphy-random)](https://www.npmjs.com/package/giphy-random)

Get random GIF from [Giphy](https://giphy.com).

## Installation

```bash
$ npm install giphy-random
```

If you want to use this library directly on the browser, you have to manually include the [axios](https://github.com/axios/axios) library too:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script src="https://unpkg.com/giphy-random/dist/giphy-random.umd.min.js"></script>
```

## Usage

```js
const giphyRandom = require("giphy-random");

(async () => {
  const API_KEY = "YOUR API KEY";

  const { data } = await giphyRandom(API_KEY);

  console.log(data);
})();
```

The `data` will contain a [GIF Object](https://developers.giphy.com/docs/#gif-object).

> To get your Giphy API key, sign up here: [developers.giphy.com/dashboard](https://developers.giphy.com/dashboard/?create=true).

## Recipes

### Filter by Tag

```js
const giphyRandom = require("giphy-random");

(async () => {
  const API_KEY = "YOUR API KEY";

  const { data } = await giphyRandom(API_KEY, {
    tag: "cat"
  });

  console.log(data);
})();
```

### Override the Default Rating

By default, Giphy will use the `G`—general audience—rating. To override this, pass the `rating` argument:

```js
const giphyRandom = require("giphy-random");

(async () => {
  const API_KEY = "YOUR API KEY";

  const { data } = await giphyRandom(API_KEY, {
    rating: "pg-13"
  });

  console.log(data);
})();
```

## API

### `giphyRandom()`

```js
giphyRandom(apiKey, [{ tag, rating }])
```

#### Parameters

* `apiKey` (`String`): Your Giphy API key.
* `tag` (optional `String`): The tag to filter the result.
* `rating` (optional `String`): [MPAA-style](https://www.mpaa.org/wp-content/uploads/2013/11/film_ratings1.jpg) rating to filter the result, default to `g`.

Here's the `rating` value that you can pass:

You can pass the following value as `rating`:
* `y`: Appropriate for all children
* `g`: General audiences (default)
* `pg`: Parental guidance suggested
* `pg-13`: Parents strongly cautioned
* `r`: Restricted

#### Return

It returns a `Promise` which when resolved contains a [Giphy API response object](https://developers.giphy.com/docs/#sample-responses). Here's an example of the resolved value with some properties that you might be interested in:

```js
{
  data: {
    type: "gif",
    id: "H2fORSKZw4SCQ",
    slug: "cats-cat-gifs-kitten-H2fORSKZw4SCQ",
    url: "https://giphy.com/gifs/cats-cat-gifs-kitten-H2fORSKZw4SCQ",
    embed_url: "https://giphy.com/embed/H2fORSKZw4SCQ",
    source_post_url: "https://kittehkats.tumblr.com/post/101035478921/found-on-lh3-googleusercontent-com",
    images: {
      downsized: {
        url: "https://media1.giphy.com/media/H2fORSKZw4SCQ/giphy-downsized.gif",
        width: "210",
        height: "138",
        size: "1930051"
      },
      original: {
        url: "https://media1.giphy.com/media/H2fORSKZw4SCQ/giphy.gif",
        width: "210",
        height: "138",
        size: "1930051",
        frames: "165",
        mp4: "https://media1.giphy.com/media/H2fORSKZw4SCQ/giphy.mp4",
        mp4_size: "781811",
        webp: "https://media1.giphy.com/media/H2fORSKZw4SCQ/giphy.webp",
        webp_size: "1368374"
      }
      // Omitted...
    },
    title: "cat kitten GIF",
    image_url: "https://media1.giphy.com/media/H2fORSKZw4SCQ/giphy.gif",
    image_mp4_url: "https://media1.giphy.com/media/H2fORSKZw4SCQ/giphy.mp4",
    image_width: "210",
    image_height: "138",
    caption: ""
    // Omitted...
  },
  meta: {
    status: 200,
    msg: "OK",
    response_id: "5be8329e796b703936aff12b"
  }
}
```

Note that there are many properties omitted from the example above. Check [Giphy documentation](https://developers.giphy.com/docs/#gif-object) for more detail.

## License

[MIT](https://github.com/risan/giphy-random/blob/master/LICENSE) © [Risan Bagja Pradana](https://bagja.net)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by [Giphy](https://giphy.com) or any of its affiliates or subsidiaries. This is an independent and unofficial API.
