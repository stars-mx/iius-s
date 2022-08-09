/**
 * 延迟函数返回，返回一个新函数
 * 输入一个函数，默认情况下，执行时间在 delay 时间或之后返回执行结果
 * @param {Function} fn      执行的函数
 * @param {number} delay     延迟时间(单位：毫秒)
 * @returns {Function}
 */
export declare const delay: <T>(fn: Function, delay?: number) => (...args: any[]) => Promise<T>;
