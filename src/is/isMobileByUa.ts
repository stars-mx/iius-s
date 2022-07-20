/**
 * 通过检测设备 ua
 * 判断是否是移动端设备
 * @returns {any}
 */
export const isMobileByUa = (userAgent: string = window.navigator.userAgent) => {
    const reg = /(Android|iPhone|Windows Phone|iPad|webOS|BlackBerry|mobile)/i
    return reg.test(userAgent)
}
