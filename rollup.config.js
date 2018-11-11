import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      file: pkg.browser,
      format: "umd",
      name: "giphyRandom",
      globals: {
        axios: "axios"
      }
    },
    external: ["axios"],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
      })
    ]
  }
];
