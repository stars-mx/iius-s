/**
 * @Author: luoob
 * @Last Modified by: luoob
 * @Introduction: 通用的函数
 */

import { CreateTime } from 'src/types/common'

/**
  * 是否移动端
 * @param {string} width
  * @returns {any}
  */
 export const isMobile = (width = '768') => {
    const isMobileUa = checkIsMini(window.navigator.userAgent)
    if (isMobileUa) {
        return true
    }
    return document.documentElement.clientWidth <= parseInt(width)
}

/**
 * 通过检测设备 ua
 * 判断是否是移动端设备
 * @returns {any}
 */
export const checkIsMini = (userAgent: string) => {
	const reg = /(Android|iPhone|Windows Phone|iPad|webOS|BlackBerry|mobile)/i
	return reg.test(userAgent)
}

/**
 * 创建时间(单位：毫秒 | 秒)
 * @param {CreateTime.Option} option
 * @param {string} unit
 * @returns {number}
 */
export function createTime(option: CreateTime.Option, unit: CreateTime.Unit = 'millisecond') {
	const { hour = 0, minute = 0, second = 0 } = option
	const times = unit === 'millisecond' ? 1000 : 1
	let totalTime = 0
	if (hour) {
		totalTime += hour * 60 * 60 * times
	}
	if (minute) {
		totalTime += minute * 60 * times
	}
	if (second) {
		totalTime += second * times
	}

	return totalTime
}

/**
 * 复制内容到剪切板
 * @param {string} val
 * @returns {any}
 */
export const copy = () => {
	let el: any = null
	const id = 'copy-id'

	return {
		exec(val: string) {
			let copyInput = el
			if (!copyInput) {
				const inputEl = document.getElementById(id)
				if (inputEl != null) {
					el = inputEl
				} else {
					copyInput = document.createElement('input')
					copyInput.id = id
					copyInput.setAttribute('style', 'position:fixed;top:-200%;')
					document.body.appendChild(copyInput)
					el = copyInput
				}
			}
			copyInput.value = val
			copyInput.select()
			copyInput.disabled = true
			const result = document.execCommand('Copy')
			copyInput.disabled = false
			if (result) {
				return true
			}
			return false
		}
	}
}

/**
 * 把数字格式化为千分位形式
 * @method toThousands
 * @param {Number} num 要格式化的数字
 * @return {String} 千分位形式的数字
 */
export const toThousands = (num: number | string) => {
	let result = ''
	num = (num || 0).toString()
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result
		num = num.slice(0, num.length - 3)
	}
	if (num) {
		result = num + result
	}
	return result
}

/**
 * 当数字小于10万时，返回带千分位的数字；
 * 当数字大于等于10万小于一亿时，返回以万为单位的数字；
 * 当数字大于等于一亿时，返回以亿为单位的数字
 * @method formatNumber
 * @param {Number} num 要格式化的数字
 * @return {String} 格式化后的数字
 */
export const formatNumber = (num: string | number) => {
	num = Number(num)
	if (isNaN(num)) {
		return num
	}
	return num < 100000
		? toThousands(num)
		: num < 100000000
		? (num / 10000).toFixed(1) + '万'
		: (num / 100000000).toFixed(1) + '亿'
}

/**
 * 向 < 10 的数值进行补 0
 * @param {any} n:number
 * @returns {any}
 */
export const padZero = (n: number) => (n < 10 ? `0${n}` : String(n))

/**
 * 创建倒计时
 * @param {number} time 毫秒数
 * @returns {{
 *  year: string
 *  month: string
 *  day: string
 *  hour: string
 *  minute: string
 *  second: string
 * }}
 */
export const createCountDownTime = (time: number) => {
	const resetTime = {
		year: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12))),
		month: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30))),
		day: padZero(Math.floor(time / (1000 * 60 * 60 * 24))),
		hour: padZero(Math.floor((time / (1000 * 60 * 60)) % 24)),
		minute: padZero(Math.floor((time / (1000 * 60)) % 60)),
		second: padZero(Math.floor((time / 1000) % 60))
	}
	return resetTime
}
