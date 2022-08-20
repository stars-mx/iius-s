/**
 * 是否正确的链接
 * @param {string} url
 * @returns {boolean}
 */
export function isURL (url: string) {
    const reg = /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/
    return reg.test(url)
}
