/**
 * 向 < 10 的数值进行补 0
 * @param {any} n:number
 * @returns {any}
 */
export const padZero = (n: number) => (n < 10 ? `0${n}` : String(n))