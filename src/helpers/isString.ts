import { getTag } from './getTag'

/**
 * 判断是否字符串
 * @param {any} value
 * @returns {boolean}
 */
export function isString (value: any): value is string {
    const type = typeof value
    return type === 'string' ||
        (type === 'object' && value != null && !Array.isArray(value) &&
        getTag(value) === '[object String]')
}
