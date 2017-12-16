import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    name: 'GiphyRandom',
    external: ['axios'],
    globals: {
      axios: 'axios'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ exclude: 'node_modules/**'})
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external: ['axios'],
    plugins: [
      babel({ exclude: 'node_modules/**' })
    ]
  }
];
