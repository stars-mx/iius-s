export type DownloadObject = {
    downloadWithFile: (file: File, fileName: string) => void
    downloadWithBlob: (blob: Blob, fileName: string) => void
    downloadWithDataURL: (dataURL: string, fileName: string) => void
}

/**
 * 点击下载文件
 * @param {string} fileName
 * @returns {void}
 */
export function createDownload (fileName?: string): DownloadObject {
    function download (_url: string, _fileName?: string) {
        const link = document.createElement('a')
        link.setAttribute('name', 'download-file')
        link.target = '_target'
        link.rel = 'noopener'
        link.download = _fileName || fileName || 'undefined'
        link.href = _url
        link.click()
    }

    return {
        downloadWithFile (file: File, _fileName?: string) {
            const url = window.URL.createObjectURL(file)
            return download(url, _fileName)
        },
        downloadWithBlob (blob: Blob, _fileName?: string) {
            const url = window.URL.createObjectURL(blob)
            return download(url, _fileName)
        },
        downloadWithDataURL (dataURL: string, _fileName?: string) {
            return download(dataURL, _fileName)
        }
    }
}
