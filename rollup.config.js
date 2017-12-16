import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import eslint from "rollup-plugin-eslint";

export default [
  {
    input: "src/index.js",
    output: {
      file: pkg.browser,
      format: "umd"
    },
    name: "GiphyRandom",
    external: ["axios"],
    globals: {
      axios: "axios"
    },
    plugins: [
      eslint({
        include: ["src/**"],
        throwOnError: true,
        throwOnWarning: true
      }),
      resolve(),
      commonjs(),
      babel({ exclude: "node_modules/**" })
    ]
  },
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: pkg.module,
        format: "es"
      }
    ],
    external: ["axios"],
    plugins: [
      eslint({
        include: ["src/**"],
        throwOnError: true,
        throwOnWarning: true
      }),
      babel({ exclude: "node_modules/**" })
    ]
  }
];
