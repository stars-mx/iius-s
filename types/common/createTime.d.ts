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
export declare const createTime: (option: Option, unit?: Unit) => number;
export {};
