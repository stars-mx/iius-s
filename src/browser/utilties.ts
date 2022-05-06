/**
* @Author: luoob
* @Last Modified by: luoob
* @Introduction: 常用的一些函数
*/

/**
 * 点击下载文件
 * @param {string | Blob} blob
 * @param {string} fileName
 * @returns {any}
 */
 export const downloadFile = (blob: any, fileName: string, isUrl = false) => {
    let downloadUrl: any = ''
    if (isUrl && typeof blob === 'string') {
        downloadUrl = blob
    } else {
        downloadUrl = window.URL.createObjectURL(blob)
    }
    const link = document.createElement('a')
    link.setAttribute('name', 'download-file')
    link.target = '_target'
    link.rel = 'noopener'
    link.download = fileName
    link.href = downloadUrl
    link.click()
}