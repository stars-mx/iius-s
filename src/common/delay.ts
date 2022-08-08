/**
 * 延迟函数返回，返回一个新函数
 * 输入一个函数，默认情况下，执行时间在 delay 时间或之后返回执行结果
 * @param {Function} fn      执行的函数
 * @param {number} delay     延迟时间(单位：毫秒)
 * @returns {Function}
 */
const delay = <T>(fn: Function, delay = 500) => {
    // eslint-disable-next-line
    return (...args: any[]) => new Promise<T>(async (resolve, reject) => {
        const start = +new Date()
        let result: any = null
        const isAsyncFn = (fn: Function) => Object.prototype.toString.call(fn).includes('AsyncFunction')
        try {
            if (isAsyncFn(fn)) {
                result = await fn(...args)
            } else {
                result = fn(...args)
            }
            const interval = +new Date() - start
            // 1000 代表一秒
            if (interval < delay) {
                setTimeout(() => {
                    resolve(result)
                }, delay - interval)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export default delay
