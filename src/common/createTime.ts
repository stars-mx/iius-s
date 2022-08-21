import { isPlainObject, isFinite } from '../helpers'

export type CreateTimeOption = {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
}

export type Unit = 'millisecond' | 'second'

/**
 * 创建时间(单位：毫秒 | 秒)
 * @param {CreateTimeOption} option 创建时间选项
 * @param {string} unit 生成的时间单位
 * @returns {number}
 */
export function createTime (option: Partial<CreateTimeOption>, unit: Unit = 'millisecond') {
    if (!isPlainObject(option)) {
        throw new Error('createTime function need time option!')
    }
    const timeAlgorithmMap: CreateTimeOption = {
        year: 60 * 60 * 24 * 30 * 12,
        month: 60 * 60 * 24 * 30,
        day: 60 * 60 * 24,
        hour: 60 * 60,
        minute: 60,
        second: 1
    }

    const times = unit === 'millisecond' ? 1000 : 1

    let totalTime = 0

    Object.keys(timeAlgorithmMap).forEach(key => {
        // @ts-ignore
        const value = option[key]
        // @ts-ignore
        const algorithm = timeAlgorithmMap[key]
        if (value && isFinite(value) && value > 0) {
            totalTime += value * algorithm * times
        }
    })

    return totalTime
}
