import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import path from 'path';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    polyfillNode(),
    json(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};
