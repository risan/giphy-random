# Giphy Random

A package to fetch a random GIF from [Giphy](https://giphy.com) API.

```js
import GiphyRandom from 'giphy-random';

const giphyRandom = new GiphyRandom({ apiKey: 'YOUR_API_KEY' });

giphyRandom.get()
  .then(data => console.log(data))
  .catch(e => console.error(e.message));
```
