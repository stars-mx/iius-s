/**
 * 向 < 10 的数值进行补 0
 * @param {number} n
 * @returns {string | number}
 */
const padZero = (n) => {
    if (!Number.isInteger(n)) {
        return n;
    }
    return (n < 10 ? `0${n}` : String(n));
};
export default padZero;
