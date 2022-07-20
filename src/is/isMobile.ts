import { isMobileByUa } from './isMobileByUa'

/**
  * 是否移动端
 * @param {string} width
  * @returns {any}
  */
export const isMobile = (width = '768') => {
    const isMobileUa = isMobileByUa()
    if (isMobileUa) {
        return true
    }
    return document.documentElement.clientWidth <= parseInt(width)
}
