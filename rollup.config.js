import typescript from '@rollup/plugin-typescript';

export default {
  input: 'ts/script.ts',
  output: {
    file: 'static/script.js',
    format: 'cjs'
  },
  plugins: [typescript()]
};
