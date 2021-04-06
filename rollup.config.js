import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

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
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    // babel({
    //   presets: ["@babel/preset-react"],
    // }),
    babel({ extensions, include: ['lib/**/*'], rumtimeHelpers: true }),
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