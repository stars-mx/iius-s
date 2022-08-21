import { isNull } from '../helpers'

/**
 * 将 DataURL 转换为 Blob
 * @param {string} dataUrl
 * @returns {Blob}
 */
export function dataURLToBlob (dataUrl: string) {
    const arr = dataUrl.split(',')
    const mines = arr[0].match(/:(.*?);/)

    if (isNull(mines)) {
        throw new TypeError('dataUrl not a correct dataURL')
    }

    const mime = mines[1]
    const bstr = window.atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}
