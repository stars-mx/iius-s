import { isString } from 'lodash-es'

/**
 * 是否正确的手机号码格式
 * @param {string} phone 手机号码
 * @return {boolean}
 */
export function isPNumber (phone: string) {
    if (!isString(phone)) {
        return false
    }
    const reg = /^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([0-35689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/
    return reg.test(phone)
}
