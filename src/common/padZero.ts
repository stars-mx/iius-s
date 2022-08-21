/**
 * 向 < 10 的数值进行补 0
 * @param {number} n
 * @returns {string | number}
 */
export function padZero (n: number) {
    if (!Number.isInteger(n)) {
        return String(n)
    }
    return (n < 10 ? `0${n}` : String(n))
}
