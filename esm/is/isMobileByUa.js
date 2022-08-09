/**
 * 通过检测设备 ua
 * 判断是否是移动端设备
 * @returns {any}
 */
const isMobileByUa = (userAgent = window.navigator.userAgent) => {
    const reg = /(Android|iPhone|Windows Phone|iPad|webOS|BlackBerry|mobile)/i;
    return reg.test(userAgent);
};
export default isMobileByUa;
