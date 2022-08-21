import { isString } from '../helpers'

/**
 * 是否正确的邮箱账号
 * @param {string} email 邮箱账号
 * @return {boolean}
 */
export function isEmail (email: string) {
    if (!isString(email)) {
        return false
    }
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(email)
}
