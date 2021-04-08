import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dotenv from 'dotenv';

dotenv.config();

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "lib/index.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve({extensions}),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' ),
      preventAssignment: true,
    }),
    babel({ extensions, include: ['lib/**/*'], babelHelpers: 'runtime' }),
    commonjs({
      include: 'node_modules/**',
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
  ]
};