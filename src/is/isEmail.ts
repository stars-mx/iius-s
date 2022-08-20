/**
 * 是否正确的邮箱账号
 * @param {string} email 邮箱账号
 * @return {boolean}
 */
export function isEmail (email: string) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(email)
}
