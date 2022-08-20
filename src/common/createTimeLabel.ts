/**
 * 创建当前时间点对应的名称字符串
 * 需要修改
 * @param {string | number | Date} time 时间字符串
 * @returns {string}
 */
export function createTimeLabel (time = '') {
    const timeRange = [
        { name: '凌晨', range: [0, 6] },
        { name: '上午', range: [6, 11] },
        { name: '中午', range: [11, 14] },
        { name: '下午', range: [14, 17] },
        { name: '晚上', range: [17, 23] }
    ]
    let timeStr = ''
    const d = new Date(time)
    const hour = d.getHours()

    const isHit = (hour: number, [start, end]: number[]) =>
        hour >= start && hour < end

    try {
        timeRange.forEach(n => {
            if (isHit(hour, n.range)) {
                throw new Error(n.name)
            }
        })
    } catch (error: any) {
        timeStr = error.message
    }
    return timeStr
}
