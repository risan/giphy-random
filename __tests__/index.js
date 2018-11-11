/* global jest:false, test:false, expect:false */
import axios from "axios";
import giphyRandom from "../src";

jest.mock("axios");

const SUCCESS_RESPONSE = { data: "foo" };

test("it can get random GIF", async () => {
  axios.get.mockResolvedValue({ data: SUCCESS_RESPONSE });

  const { data } = await giphyRandom("SECRET");

  const firstArg = axios.get.mock.calls[0][0];
  const secondArg = axios.get.mock.calls[0][1];

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(firstArg).toMatch(/api\.giphy\.com[\S]*random/m);
  expect(secondArg).toHaveProperty("params");
  expect(secondArg).toHaveProperty("params.api_key", "SECRET");
  expect(secondArg.params.tag).toBeUndefined();

  expect(data).toBe("foo");
});

test("the default rating must be G", async () => {
  axios.get.mockResolvedValue({ data: SUCCESS_RESPONSE });

  const { data } = await giphyRandom("SECRET");

  expect(axios.get.mock.calls[0][1]).toHaveProperty("params.rating", "g");
});

test("it can receive tag and rating arguments", async () => {
  axios.get.mockResolvedValue({ data: SUCCESS_RESPONSE });

  const { data } = await giphyRandom("SECRET", {
    tag: "cat",
    rating: "pg"
  });

  expect(axios.get.mock.calls[0][1]).toHaveProperty("params.tag", "cat");
  expect(axios.get.mock.calls[0][1]).toHaveProperty("params.rating", "pg");
});
