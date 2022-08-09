/**
 * 点击下载文件
 * @param {string | Blob} blob
 * @param {string} fileName
 * @param {boolean} isUrl
 * @returns {void}
 */
declare const download: (blob: any, fileName: string, isUrl?: boolean) => void;
export default download;
