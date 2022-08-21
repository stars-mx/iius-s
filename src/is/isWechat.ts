import { isString } from '../helpers'

/**
 * 是否正确的微信账号
 * @param {string} wechat 微信账号
 * @return {boolean}
 */
export function isWechat (wechat: string) {
    if (!isString(wechat)) {
        return false
    }
    const reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
    return reg.test(wechat)
}
