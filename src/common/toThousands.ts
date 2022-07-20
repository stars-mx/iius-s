/**
 * 把数字格式化为千分位形式
 * @method toThousands
 * @param {Number} num 要格式化的数字
 * @return {String} 千分位形式的数字
 */
export const toThousands = (num: number | string) => {
    let result = ''
    num = (num || 0).toString()
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
    }
    if (num) {
        result = num + result
    }
    return result
}
