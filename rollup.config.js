import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'

const publicConfig = {
    format: 'umd',
    name: 'iius'
}

const noDeclarationTsPlg = typescript({
    declaration: false,
    declarationDir: null
})

const config = defineConfig([
    {
        input: 'src/index.ts',
        output: [
            { file: 'iius.js', ...publicConfig },
            { file: 'iius.min.js', ...publicConfig, plugins: [terser()] }
        ],
        plugins: [
            noDeclarationTsPlg
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'iius.mjs',
            format: 'es'
        },
        plugins: [
            noDeclarationTsPlg
        ]
    },
    {
        input: 'types/index.d.ts',
        output: {
            file: 'index.d.ts'
        },
        plugins: [
            dts(),
            del({
                targets: 'types',
                hook: 'buildEnd'
            })
        ]
    }
])

export default config
