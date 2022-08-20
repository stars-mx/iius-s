import { isURL } from '../is/isURL'
import { isNil, isString } from 'lodash-es'

/**
 * 点击下载文件
 * @param {string | Blob} blob
 * @param {string} fileName
 * @param {boolean} _isURL
 * @returns {void}
 */
export function download (data: string | Blob, fileName: string, _isURL?: boolean) {
    const downloadUrl = (() => {
        // 如果 isURL 没传参或者传入 null
        if (isString(data)) {
            if (isNil(_isURL)) {
                _isURL = isURL(data)
            }

            if (_isURL) {
                return data
            }
        }
        return window.URL.createObjectURL(data as Blob)
    })()

    const link = document.createElement('a')
    link.setAttribute('name', 'download-file')
    link.target = '_target'
    link.rel = 'noopener'
    link.download = fileName
    link.href = downloadUrl
    link.click()
}
