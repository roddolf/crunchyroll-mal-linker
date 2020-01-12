import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import shiftHeader from 'rollup-plugin-shift-header';


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    input: 'src/main.ts',
    plugins: [
        shiftHeader(),
        typescript(),
        resolve(),
        isProduction && terser({
            output: {
                comments: "all"
            }
        }),
    ],
    output: {
        file: 'dist/main.js',
        format: 'iife'
    },
};