import { padZero } from './padZero'
import { isString, isDate } from 'lodash-es'

export type CountDown = {
    year: string
    month: string
    day: string
    hour: string
    minute: string
    second: string
}

/**
 * 创建倒计时
 * @param {number | string | Date} time 毫秒数
 * @returns {{
 *  year: string
 *  month: string
 *  day: string
 *  hour: string
 *  minute: string
 *  second: string
 * }}
 */
export function createCountDown (time: number | string | Date = new Date()): CountDown {
    if (isString(time)) {
        // ios 不支持 xxxx/xx/xxx 的格式
        time = +new Date(time.replace(/\//ig, '-'))
    } else if (isDate(time)) {
        time = +time
    }

    return {
        year: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12))),
        month: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30))),
        day: padZero(Math.floor(time / (1000 * 60 * 60 * 24))),
        hour: padZero(Math.floor((time / (1000 * 60 * 60)) % 24)),
        minute: padZero(Math.floor((time / (1000 * 60)) % 60)),
        second: padZero(Math.floor((time / 1000) % 60))
    }
}
