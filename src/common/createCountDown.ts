import padZero from './padZero'

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
const createCountDown = (time: number) => {
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

export default createCountDown