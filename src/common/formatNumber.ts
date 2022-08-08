import toThousands from './toThousands.js'

/**
 * 当数字小于10万时，返回带千分位的数字；
 * 当数字大于等于10万小于一亿时，返回以万为单位的数字；
 * 当数字大于等于一亿时，返回以亿为单位的数字
 * @method formatNumber
 * @param {number} num 要格式化的数字
 * @return {string} 格式化后的数字
 */
const formatNumber = (num: string | number) => {
    num = Number(num)
    if (isNaN(num)) {
        return num
    }
    return num < 100000
        ? toThousands(num)
        : num < 100000000
            ? (num / 10000).toFixed(1) + '万'
            : (num / 100000000).toFixed(1) + '亿'
}

export default formatNumber
