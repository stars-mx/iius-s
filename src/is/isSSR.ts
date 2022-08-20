/**
 * 是否服务端渲染
 * @returns {boolean}
 */
export function isSSR () {
    try {
        return !(typeof window !== 'undefined' && document !== undefined)
    } catch (e) {
        return true
    }
}
