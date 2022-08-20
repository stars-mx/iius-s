import { set } from 'lodash-es'

/**
 * 将 Blob 转换为 File
 * @param {Blob} theBlob
 * @param {string} fileName
 * @returns {File}
 */
export function blobToFile (theBlob: Blob, fileName: string) {
    set(theBlob, 'lastModifiedDate', new Date())
    set(theBlob, 'name', fileName)
    return theBlob
}
