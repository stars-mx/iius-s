const fse = require('fs-extra')
const path = require('path')
const fs = require('fs')
const formatByEslint = require('../helpers/formatByEslint')
const { upperFirst } = require('lodash')

const targetDir = path.join(__dirname, '../src')
const entryFilePath = path.join(targetDir, 'index.ts')
const ignoreDirs = [
    'helpers'
]
const ignoreFiles = [
    path.join(targetDir, 'index.ts')
]

/**
 * 递归遍历文件夹, 返回文件的相对路径（相对于 dirPath）
 * @param {string} dirPath
 * @returns {string[]}
 */
function getSourceFiles (dirPath = targetDir) {
    function isIgnoreFile (fp) {
        return ignoreFiles.includes(fp)
    }
    function removeExtname (ep) {
        return ep.replace(path.extname(ep), '')
    }
    function toRelativePath (lp) {
        return '.' + lp
    }
    function removeAbsolutePath (np) {
        return np.replace(dirPath, '')
    }
    function getFiles (dirP) {
        const dirContent = fse.readdirSync(dirP)
        return dirContent.map(fp => {
            if (ignoreDirs.includes(fp)) {
                return undefined
            }

            const nextPath = path.join(dirP, fp)
            const isDir = fs.statSync(nextPath).isDirectory()

            if (isDir) {
                return getFiles(nextPath)
            }

            if (isIgnoreFile(nextPath)) {
                return undefined
            }

            return toRelativePath(removeExtname(removeAbsolutePath(nextPath)))
        }).filter(Boolean)
    }

    return getFiles(dirPath)
}

function createImport (relativePath) {
    return `export * from '${relativePath}'\n`
}
function createModuleComment (list) {
    const { basename, dirname } = path
    const firstFilePath = list[0]
    const moduleName = basename(dirname(firstFilePath))

    return `// ${upperFirst(moduleName)} Part\n`
}
function pushImportToContent (list) {
    let content = ''

    function innerFunction (_list) {
        _list.forEach(n => {
            if (Array.isArray(n)) {
                content += createModuleComment(n)
                return innerFunction(n)
            }

            const importContent = createImport(n)
            content += importContent
        })

        content += '\n'
    }

    innerFunction(list)

    return content
}

const files = getSourceFiles()

const content = pushImportToContent(files)

fse.outputFileSync(entryFilePath, content, 'utf-8')

formatByEslint(entryFilePath)

console.log('✅ 更新入口文件成功')
