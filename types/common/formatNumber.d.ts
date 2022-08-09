/**
 * 当数字小于10万时，返回带千分位的数字；
 * 当数字大于等于10万小于一亿时，返回以万为单位的数字；
 * 当数字大于等于一亿时，返回以亿为单位的数字
 * @method formatNumber
 * @param {number} num 要格式化的数字
 * @return {string} 格式化后的数字
 */
declare const formatNumber: (num: string | number) => string | number;
export default formatNumber;
