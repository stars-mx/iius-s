import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'

const publicConfig = {
    format: 'umd',
    name: 'iius'
}

const config = defineConfig([
    {
        input: 'src/index.ts',
        output: [
            { file: 'iius.js', ...publicConfig },
            { file: 'iius.min.js', ...publicConfig, plugins: [terser()] }
        ],
        plugins: [
            typescript({
                declaration: false,
                declarationDir: ''
            })
        ]
    },
    {
        input: 'types/index.d.ts',
        output: {
            file: 'index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
])

export default config
