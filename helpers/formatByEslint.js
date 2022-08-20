/**
* @fileoverview Format file rule by lint tool
* @author Luoob
*/

const spawn = require('cross-spawn')

/**
 * Use
 * @param {string[] | string} filePaths
 * @returns {void}
 */
function formatByEslint (filePaths) {
    filePaths = Array.isArray(filePaths) ? filePaths : [filePaths]

    const result = spawn.sync('npx', ['eslint', '--fix', '--quiet'].concat(filePaths), { encoding: 'utf-8' })

    if (result.error || result.status !== 0) {
        console.log('format by eslint occur error')
    }
}

module.exports = formatByEslint
