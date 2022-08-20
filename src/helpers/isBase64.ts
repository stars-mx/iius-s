/**
 * 浏览器版本判断是否 base64 格式的字符串
 * @param {string} base64
 * @returns {boolean}
 */
export function isBase64 (base64: string) {
    if (base64 === '' || base64.trim() === '') {
        return false
    }
    try {
        return window.btoa(window.atob(base64)) === base64
    } catch (err) {
        return false
    }
}
