/**
 * 将 Blob 转换为 File
 * @param {Blob} theBlob
 * @param {string} fileName
 * @returns {File}
 */
export function blobToFile (theBlob: Blob, fileName: string) {
    Reflect.set(theBlob, 'lastModifiedDate', new Date())
    Reflect.set(theBlob, 'name', fileName)
    return theBlob
}
