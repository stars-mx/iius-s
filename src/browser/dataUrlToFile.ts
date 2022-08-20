import { blobToFile } from './blobToFile'
import { dataURLtoBlob } from './dataURLtoBlob'

/**
 * DataURL 转 File 对象
 * @param {string} dataURL
 * @param {string} fileName
 * @returns {File}
 */
export function dataUrlToFile (dataURL: string, fileName: string) {
    const tempBlob = dataURLtoBlob(dataURL)
    return blobToFile(tempBlob, fileName)
}
