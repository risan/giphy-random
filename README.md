# Giphy Random

[![Latest Stable Version](https://img.shields.io/npm/v/giphy-random.svg?style=flat-square)](https://www.npmjs.com/package/giphy-random)
[![Build Status](https://img.shields.io/travis/risan/giphy-random.svg?style=flat-square)](https://travis-ci.org/risan/giphy-random)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/risan/giphy-random.svg?style=flat-square)](https://codeclimate.com/github/risan/giphy-random/test_coverage)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/risan/giphy-random.svg?style=flat-square)](https://codeclimate.com/github/risan/giphy-random/maintainability)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/risan/giphy-random)
[![License](https://img.shields.io/npm/l/giphy-random.svg?style=flat-square)](https://www.npmjs.com/package/giphy-random)

A package to fetch a random GIF from [Giphy](https://giphy.com) API.

## Install

This package relies on [axios](https://github.com/axios/axios) library, so you need to install it too.

```bash
$ npm run axios giphy-random
```

You can also use this library directly on your browser by loading the UMD bundle in the script tag.

```html
<!-- For development -->
<script src="https://unpkg.com/giphy-random@latest/dist/giphy-random.umd.js"></script>

<!-- Minified for production -->
<script src="https://unpkg.com/giphy-random@latest/dist/giphy-random.umd.min.js"></script>
```

## Usage

```js
import GiphyRandom from 'giphy-random';

const giphyRandom = new GiphyRandom({ apiKey: 'YOUR_API_KEY' });

giphyRandom.get()
  .then(data => console.log(data))
  .catch(e => console.error(e.message));
```

You can get your Giphy API key by [here](https://developers.giphy.com/dashboard/?create=true).

### Specifying default rating

Giphy use [MPAA-style](https://www.mpaa.org/wp-content/uploads/2013/11/film_ratings1.jpg) rating to filter the content. You can specify the default rating by passing `rating` parameter to the costructor:

```js
const giphyRandom = new GiphyRandom({ apiKey: 'YOUR_API_KEY', rating: 'PG' });
```

You can pass the following value as `rating`:
* `Y`: Appropriate for all children
* `G`: General audiences (default)
* `PG`: Parental guidance suggested
* `PG-13`: Parents strongly cautioned
* `R`:Restricted

### Filtering by tag

You can filter the results by specified tag:

```js
giphyRandom.get({ tag: 'cat' })
  .then(data => console.log(data))
  .catch(e => console.error(e.message));
```

### Overwrite the default rating

You can overwrite the default content rating by passing `rating` parameter:

```js
giphyRandom.get({ rating: 'PG-13' })
  .then(data => console.log(data))
  .catch(e => console.error(e.message));
```

## License

MIT © [Risan Bagja Pradana](https://risan.io)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by [Giphy](https://giphy.com) or any of its affiliates or subsidiaries. This is an independent and unofficial API.
