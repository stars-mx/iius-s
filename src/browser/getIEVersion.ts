export function getIEVsersion (userAgent = window.navigator.userAgent) {
    let version
    // 判断是否为小于 IE11 的浏览器
    const isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
    // 判断是否为 IE 的 Edge 浏览器(旧版)
    const isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isLessIE11) {
        // eslint-disable-next-line
        const IEReg = new RegExp('/MSIE (\\d+\\.\\d+);/')
        IEReg.test(userAgent)
        const IEVersionNum = parseFloat(RegExp.$1)
        if (IEVersionNum === 7) {
            version = 7
        } else if (IEVersionNum === 8) {
            version = 8
        } else if (IEVersionNum === 9) {
            version = 9
        } else if (IEVersionNum === 10) {
            version = 10
        } else {
            version = 6
        }
    } else if (isEdge) {
        version = 'edge'
    } else if (isIE11) {
        version = 11
    } else {
        version = false
    }

    return version
}
