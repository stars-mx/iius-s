export type DownloadObject = {
    downloadWithFile: (file: File) => void
    downloadWithBlob: (blob: Blob) => void
    downloadWithDataURL: (dataURL: string) => void
}

/**
 * 点击下载文件
 * @param {string} fileName
 * @returns {void}
 */
export function createDownload (fileName: string): DownloadObject {
    function download (_url: string) {
        const link = document.createElement('a')
        link.setAttribute('name', 'download-file')
        link.target = '_target'
        link.rel = 'noopener'
        link.download = fileName
        link.href = _url
        link.click()
    }

    return {
        downloadWithFile (file: File) {
            const url = window.URL.createObjectURL(file)
            return download(url)
        },
        downloadWithBlob (blob: Blob) {
            const url = window.URL.createObjectURL(blob)
            return download(url)
        },
        downloadWithDataURL (dataURL: string) {
            return download(dataURL)
        }
    }
}
