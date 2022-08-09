/**
 * 点击下载文件
 * @param {string | Blob} blob
 * @param {string} fileName
 * @param {boolean} isUrl
 * @returns {void}
 */
declare const download: (blob: any, fileName: string, isUrl?: boolean) => void;

/**
* @fileoverview 滚动处理函数
* @author Luoob
*/
interface ScrollCondig {
    target?: string;
    speed?: number;
}
interface IScrollIns {
    scrollTo: (distance: number, fn?: () => void) => void;
    scrollToTop: (fn?: () => void) => void;
}
/**
 * 页面滚动
 * @param {ScrollCondig} option
 * @returns {IScrollIns}
 */
declare function scroll(option?: ScrollCondig): IScrollIns;

/**
 * 复制内容到剪切板
 * @param {string} val
 * @returns {any}
 */
declare const copy: () => {
    exec(val: string): boolean;
};

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
declare const createCountDown: (time: number) => {
    year: string | number;
    month: string | number;
    day: string | number;
    hour: string | number;
    minute: string | number;
    second: string | number;
};

interface Option {
    hour?: number;
    minute?: number;
    second?: number;
}
declare type Unit = 'millisecond' | 'second';
/**
 * 创建时间(单位：毫秒 | 秒)
 * @param {Option} option
 * @param {string} unit
 * @returns {number}
 */
declare const createTime: (option: Option, unit?: Unit) => number;

/**
 * 延迟函数返回，返回一个新函数
 * 输入一个函数，默认情况下，执行时间在 delay 时间或之后返回执行结果
 * @param {Function} fn      执行的函数
 * @param {number} delay     延迟时间(单位：毫秒)
 * @returns {Function}
 */
declare const delay: <T>(fn: Function, delay?: number) => (...args: any[]) => Promise<T>;

/**
 * 当数字小于10万时，返回带千分位的数字；
 * 当数字大于等于10万小于一亿时，返回以万为单位的数字；
 * 当数字大于等于一亿时，返回以亿为单位的数字
 * @method formatNumber
 * @param {number} num 要格式化的数字
 * @return {string} 格式化后的数字
 */
declare const formatNumber: (num: string | number) => string | number;

/**
 * 向 < 10 的数值进行补 0
 * @param {number} n
 * @returns {string | number}
 */
declare const padZero: (n: number) => string | number;

/**
 * 把数字格式化为千分位形式
 * @method toThousands
 * @param {number | string} num 要格式化的数字
 * @return {string} 千分位形式的数字
 */
declare const toThousands: (num: number | string) => string;

/**
 * 压缩图片方法
 * @param {file} file 文件
 * @param {number} quality 图片质量(取值0 - 1之间默认0.92)
 */
declare const compressImg: (file: any, quality: number) => Promise<unknown>;

/**
  * 是否移动端
 * @param {string} width
  * @returns {any}
  */
declare const isMobile: (width?: string) => boolean;

/**
 * 通过检测设备 ua
 * 判断是否是移动端设备
 * @returns {any}
 */
declare const isMobileByUa: (userAgent?: string) => boolean;

export { IScrollIns, ScrollCondig, compressImg, copy, createCountDown, createTime, delay, download, formatNumber, isMobile, isMobileByUa, padZero, scroll, toThousands };
