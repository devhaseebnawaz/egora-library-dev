import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import path from 'path';
import polyfillNode from 'rollup-plugin-polyfill-node';
import fs from 'fs';

const retailCssPlugin = {
  name: 'retail-css-runtime',
  resolveId(source, importer) {
    if (source === './retail.css' && importer?.endsWith('/components/brgr/retail/index.js')) {
      return `${importer}\0retail-css`;
    }
    return null;
  },
  load(id) {
    if (!id.endsWith('/components/brgr/retail/index.js\0retail-css')) return null;
    const cssPath = id.split('\0')[0].replace('/index.js', '/retail.css');
    const css = JSON.stringify(fs.readFileSync(cssPath, 'utf8'));
    return `if (typeof document !== 'undefined' && !document.querySelector('[data-egora-retail-styles]')) { const style = document.createElement('style'); style.setAttribute('data-egora-retail-styles', ''); style.textContent = ${css}; document.head.appendChild(style); }`;
  },
};

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
    retailCssPlugin,
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
