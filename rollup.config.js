import path from 'path';
import typescript from 'rollup-plugin-typescript2';
// import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    input: 'src/script.user.ts',
    plugins: [
        license({
            banner: {
                commentStyle: 'none',
                content: {
                    file: path.join(__dirname, 'script.meta.js'),
                    encoding: 'utf-8',
                },
            },
        }),
        typescript({}),
        isProduction && terser({
            output: {
                comments: "all"
            }
        }),
    ],
    output: {
        dir: 'dist',
        format: 'iife'
    },
};