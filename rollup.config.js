import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const baseConfig = ({ file, format, babelConfig = {} } = {}) => ({
  input: "src/index.js",
  output: {
    file,
    format
  },
  external: ["axios"],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
      ...babelConfig
    })
  ]
});

const umdConfig = ({ minify = false } = {}) => {
  const file = minify ? pkg.browser.replace(/\.js$/, ".min.js") : pkg.browser;

  const config = baseConfig({ file, format: "umd" });

  config.output = {
    ...config.output,
    name: "giphyRandom",
    globals: {
      axios: "axios"
    }
  };

  if (minify) {
    config.plugins.push(terser());
  }

  return config;
};

export default [
  // UMD.
  umdConfig(),
  umdConfig({ minify: true }),

  // CommonJS.
  baseConfig({
    file: pkg.main,
    format: "cjs",
    babelConfig: {
      babelrc: false,
      runtimeHelpers: false,
      presets: [
        [
          "@babel/env",
          {
            modules: false,
            targets: "node 8"
          }
        ]
      ]
    }
  })
];
