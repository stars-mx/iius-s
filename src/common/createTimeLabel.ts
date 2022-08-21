export type TimeRange = {
    name: string
    range: [number, number]
}
export type TimeLabel = {
    update: (_range: TimeRange[]) => void,
    match: (time: string | number | Date) => string
}

/**
 * 创建当前时间点对应的名称字符串
 * 需要修改
 * @param {string | number | Date} time 时间字符串
 * @returns {string}
 */
export function createTimeLabel (range: TimeRange[]) {
    let iRange: TimeRange[] = range

    return {
        update (_range: TimeRange[]) {
            iRange = _range
        },
        match (time: string | number | Date) {
            let timeStr = ''
            const d = new Date(time)
            const hour = d.getHours()

            const isHit = (hour: number, [start, end]: number[]) =>
                hour >= start && hour < end

            try {
                iRange.forEach(n => {
                    if (isHit(hour, n.range)) {
                        throw new Error(n.name)
                    }
                })
            } catch (error: any) {
                timeStr = error.message
            }
            return timeStr
        }
    }
}
