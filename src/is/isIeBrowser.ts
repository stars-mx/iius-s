/**
 * 是否 IE 浏览器
 * @returns {boolean}
 */
export function isIEBrowser () {
    // @ts-ignore
    return !!window.ActiveXObject || 'ActiveXObject' in window
}
