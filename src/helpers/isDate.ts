import { nodeTypes } from './nodeTypes'
import { isObjectLike } from './isObjectLike'
import { getTag } from './getTag'

/* Node.js helper references. */
const nodeIsDate = nodeTypes && nodeTypes.isDate

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
export function isDate (value: any): value is Date {
    return nodeIsDate
        ? nodeIsDate(value)
        : isObjectLike(value) && getTag(value) === '[object Date]'
}
