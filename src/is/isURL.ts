import { isString } from '../helpers'

/**
 * 是否合法链接
 * @param {string} url
 * @returns {boolean}
 */
export function isURL (url: string) {
    if (!isString(url)) {
        return false
    }
    const reg = /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/
    return reg.test(url)
}
