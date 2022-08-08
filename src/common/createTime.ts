interface Option {
    hour?: number
    minute?: number
    second?: number
}

type Unit = 'millisecond' | 'second'

/**
 * 创建时间(单位：毫秒 | 秒)
 * @param {Option} option
 * @param {string} unit
 * @returns {number}
 */
const createTime = (option: Option, unit: Unit = 'millisecond') => {
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

export default createTime
