import { isMobileByUa } from './isMobileByUa'

/**
 * 当前设备是否移动端
 * @param {number} width
 * @returns {boolean}
 */
export function isMobile (width = 768) {
    const isMobileUa = isMobileByUa()
    if (isMobileUa) {
        return true
    }
    return document.documentElement.clientWidth <= width
}
