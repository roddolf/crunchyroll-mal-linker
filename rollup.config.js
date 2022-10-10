import path from 'path';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';


const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: 'src/script.user.ts',
    context: 'window',
    plugins: [
        typescript({}),
        isProduction && terser({}),
        license({
            banner: {
                commentStyle: 'none',
                content: {
                    file: path.join(__dirname, 'script.meta.js'),
                    encoding: 'utf-8',
                },
            },
        }),
    ],
    output: {
        dir: 'dist',
        format: 'iife'
    },
};