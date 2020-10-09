import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: './lib/index.js',
      },
      {
        format: 'esm',
        file: './lib/index.mjs',
      },
    ],
    plugins: [typescript()],
    external: ['ts-graphviz', 'child_process', 'tmp-promise', 'util', 'fs'],
  },
  {
    input: './lib/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
