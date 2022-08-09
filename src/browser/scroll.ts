/**
* @fileoverview 滚动处理函数
* @author Luoob
*/

export interface ScrollCondig {
    target?: string
    speed?: number
}

export interface IScrollIns {
    scrollTo: (distance: number, fn?: () => void) => void
    scrollToTop: (fn?: () => void) => void
}

const defaultConfig: ScrollCondig = {
    target: '',
    speed: 100 // 值越小，速度越快
}

const cubic = (value: number) => Math.pow(value, 3)
const easeInOutCubic = (value: number) => value < 0.5
    ? cubic(value * 2) / 2
    : 1 - cubic((1 - value) * 2) / 2

/**
 * 页面滚动
 * @param {ScrollCondig} option
 * @returns {IScrollIns}
 */
export function scroll (option: ScrollCondig = {}): IScrollIns {
    option = { ...defaultConfig, ...option }

    let cb: any = null
    let targetEl: any = null

    targetEl = document.documentElement

    if (option.target) {
        targetEl = document.querySelector(option.target)
        if (!targetEl) {
            throw new Error(`target is not existed: ${option.target}`)
        }
    }

    const scrollTo = (distance: number, fn?: () => void) => {
        cb = fn || (() => {})
        const iel = targetEl
        const beginTime = Date.now()
        const beginValue = iel.scrollTop
        const interval = Math.abs(beginValue - distance)
        const isUp = distance < beginValue

        const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))

        const frameFunc = () => {
            const progress = (Date.now() - beginTime) / option.speed!
            if (progress < 1) {
                if (isUp) {
                    // 向上 -
                    iel.scrollTop = (
                        beginValue - (interval * (easeInOutCubic(progress)))
                    )
                } else {
                    // 向下 +
                    iel.scrollTop = (
                        beginValue + (interval * (easeInOutCubic(progress)))
                    )
                }
                rAF(frameFunc)
            } else {
                iel.scrollTop = distance
                cb && cb()
            }
        }
        rAF(frameFunc)
    }

    return {
        scrollTo,
        scrollToTop: (fn?: () => void) => scrollTo(0, fn)
    }
}
