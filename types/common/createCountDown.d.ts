/**
 * 创建倒计时
 * @param {number} time 毫秒数
 * @returns {{
 *  year: string
 *  month: string
 *  day: string
 *  hour: string
 *  minute: string
 *  second: string
 * }}
 */
export declare const createCountDown: (time: number) => {
    year: string | number;
    month: string | number;
    day: string | number;
    hour: string | number;
    minute: string | number;
    second: string | number;
};
