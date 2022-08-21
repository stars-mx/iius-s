import { blobToFile } from './blobToFile'
import { dataURLToBlob } from './dataURLToBlob'

/**
 * DataURL 转 File 对象
 * @param {string} dataURL
 * @param {string} fileName
 * @returns {File}
 */
export function dataURLToFile (dataURL: string, fileName: string) {
    const tempBlob = dataURLToBlob(dataURL)
    return blobToFile(tempBlob, fileName)
}
