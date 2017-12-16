import nock from "nock";
import GiphyRandom from "../src";

const API_KEY = "secret";
const GIPHY_RANDOM_API = "https://api.giphy.com/v1/gifs/random";
const SUCCESS_RESPONSE = { data: { image_url: "https://foo.bar" } };
const ERROR_RESPONSE = { meta: { msg: "foo bar", status: 401 } };

const giphyRandom = new GiphyRandom({ apiKey: API_KEY });

const createServer = ({
  query = { api_key: API_KEY, rating: "G" },
  statusCode = 200,
  response = SUCCESS_RESPONSE
} = {}) => {
  return nock("https://api.giphy.com/v1/gifs")
    .get("/random")
    .query(query)
    .reply(statusCode, response);
};

const createServerWithError = (error) => {
  return nock("https://api.giphy.com/v1/gifs")
    .get("/random")
    .query({ api_key: API_KEY, rating: "G" })
    .replyWithError(error);
};

test("throws error if apiKey is not provided", () => {
  expect(() => new GiphyRandom()).toThrow(/apiKey parameter is required/);
});

test("can get Giphy random API URI", () => {
  expect(GiphyRandom.URI).toBe(GIPHY_RANDOM_API);
});

test("can get apiKey property", () => {
  expect(giphyRandom.apiKey).toBe(API_KEY);
});

test("can get the default defaultRating property", () => {
  expect(giphyRandom.defaultRating).toBe("G");
});

test("can set the defaultRating property", () => {
  const giphyRandom = new GiphyRandom({ apiKey: API_KEY, defaultRating: "PG" });

  expect(giphyRandom.defaultRating).toBe("PG");
});

test("can get the default uri property", () => {
  expect(giphyRandom.uri).toBe(GiphyRandom.URI);
});

test("can set the uri property", () => {
  const giphyRandom = new GiphyRandom({
    apiKey: API_KEY,
    uri: "https://foo.bar"
  });

  expect(giphyRandom.uri).toBe("https://foo.bar");
});

test("can get random GIF", () => {
  const server = createServer();

  expect.assertions(1);

  return expect(giphyRandom.get()).resolves.toEqual(SUCCESS_RESPONSE.data);
});

test("can get random GIF with tag parameter", () => {
  const server = createServer({
    query: { api_key: API_KEY, tag: "bar", rating: "G" }
  });

  expect.assertions(1);

  return expect(giphyRandom.get({ tag: "bar" })).resolves.toEqual(
    SUCCESS_RESPONSE.data
  );
});

test("can get random GIF with rating parameter", () => {
  const server = createServer({
    query: { api_key: API_KEY, rating: "PG" }
  });

  expect.assertions(1);

  return expect(giphyRandom.get({ rating: "PG" })).resolves.toEqual(
    SUCCESS_RESPONSE.data
  );
});

test("throws error when API returns bad request response", () => {
  const server = createServer({
    statusCode: 400,
    response: ERROR_RESPONSE
  });

  expect.assertions(1);

  return expect(giphyRandom.get()).rejects.toHaveProperty(
    "message",
    "Failed requesting random GIF from Giphy: [401] foo bar"
  );
});

test("throws error when API retruns no response", () => {
  const server = createServerWithError({ request: "foo bar" });

  expect.assertions(1);

  return expect(giphyRandom.get()).rejects.toHaveProperty(
    "message",
    "Failed requesting random GIF from Giphy, no response was received."
  );
});

test("throws error when request failed", () => {
  const server = createServerWithError("foo bar");

  expect.assertions(1);

  return expect(giphyRandom.get()).rejects.toHaveProperty("message", "foo bar");
});
