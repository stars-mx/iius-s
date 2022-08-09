var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 延迟函数返回，返回一个新函数
 * 输入一个函数，默认情况下，执行时间在 delay 时间或之后返回执行结果
 * @param {Function} fn      执行的函数
 * @param {number} delay     延迟时间(单位：毫秒)
 * @returns {Function}
 */
const delay = (fn, delay = 500) => {
    // eslint-disable-next-line
    return (...args) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const start = +new Date();
        let result = null;
        const isAsyncFn = (fn) => Object.prototype.toString.call(fn).includes('AsyncFunction');
        try {
            if (isAsyncFn(fn)) {
                result = yield fn(...args);
            }
            else {
                result = fn(...args);
            }
            const interval = +new Date() - start;
            // 1000 代表一秒
            if (interval < delay) {
                setTimeout(() => {
                    resolve(result);
                }, delay - interval);
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
export default delay;
