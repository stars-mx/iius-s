/**
 * 复制内容到剪切板
 * @param {string} val
 * @returns {any}
 */
declare const copy: () => {
    exec(val: string): boolean;
};
export default copy;
