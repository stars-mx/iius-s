import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'

const publicConfig = {
    format: 'umd',
    name: 'iius',
    globals: {
        iius: 'iius'
    }
}

const config = defineConfig({
    input: './src/index.ts',
    output: [
        { file: './iius.js', ...publicConfig },
        { file: './iius.min.js', ...publicConfig, plugins: [terser()] }
    ],
    plugins: [
        typescript({
            declaration: false
        })
    ]
})

export default config
