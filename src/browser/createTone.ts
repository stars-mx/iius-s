/**
* @fileoverview 创建色调管理器
* @author Luoob
*/

type DefaultTone = 'Dark' | 'Light' | 'System'

type CreateToneOption<U> = {
    key: string
    tones: U[]
    onUpdate?: (tone: string) => void
}

type IsRecord<V extends string> = Record<`is${V}`, boolean>

type ToneManager<S extends string> = IsRecord<S> & IsRecord<DefaultTone> & {
    getMode: () => S,
    setMode: (tone: S) => void
    init: () => void
    cancel: () => void
}

export function createTone<T extends string> (option: CreateToneOption<T>): ToneManager<T> | false {
    type Tone = T | DefaultTone

    let oldTone = ''

    const InnerTone: Record<DefaultTone, DefaultTone> = {
        System: 'System',
        Light: 'Light',
        Dark: 'Dark'
    }

    const DefaultToneValue: DefaultTone = InnerTone.System

    const iQuery = '(prefers-color-scheme: dark)'

    const isSupported = window && 'matchMedia' in window && typeof window.matchMedia === 'function'

    const mq: MediaQueryList = window.matchMedia(iQuery)

    function filterTone (tone: Tone) {
        return tone.toLocaleLowerCase()
    }

    function updateClass (tone: Tone) {
        oldTone && document.documentElement.classList.remove(oldTone)
        const targetTone = filterTone(tone)
        targetTone && document.documentElement.classList.add(targetTone)
        oldTone = targetTone

        if (option.onUpdate && typeof option.onUpdate === 'function') {
            option.onUpdate(targetTone)
        }
    }

    function isDarkMode () {
        return mq && mq.matches
    }

    function isSystem (tone: Tone) {
        return tone === InnerTone.System
    }

    function createIsModeObj<T extends string> (list: T[]) {
        return list.reduce((prev, cur) => {
            return Object.assign(prev, {
                [`is${cur}`] () {
                    return getMode() === cur
                }
            })
        }, {})
    }

    function update () {
        if (!isSupported) {
            return
        }

        const tone = isDarkMode() ? InnerTone.Dark : InnerTone.Light
        // 设置本地缓存
        localStorage.setItem(option.key, tone)
        // 修改 class
        updateClass(tone)
    }

    function listenSystem () {
        if (!mq) {
            return
        }
        if ('addEventListener' in mq) {
            mq.addEventListener('change', update)
        } else {
            // @ts-ignore
            mq.addListener(update)
        }
    }

    function cancelListenSystem () {
        if (!mq) {
            return
        }

        if ('removeEventListener' in mq) {
            mq.removeEventListener('change', update)
        } else {
            // @ts-ignore
            mq.removeListener(update)
        }
    }

    function getMode () {
        return (localStorage.getItem(option.key) || DefaultToneValue) as Tone
    }

    function setMode (tone: Tone) {
        let classTone = tone
        if (isSystem(tone)) {
            classTone = isDarkMode() ? InnerTone.Dark : InnerTone.Light
            listenSystem()
        } else {
            cancelListenSystem()
        }
        // 设置本地缓存
        localStorage.setItem(option.key, tone)
        // 修改 class
        updateClass(classTone)
    }

    const isToneModeObj = isSupported && createIsModeObj(option.tones)

    const isInnerModeObj = isSupported && createIsModeObj([InnerTone.Dark, InnerTone.Light, InnerTone.System])

    if (isSupported) {
        return {
            getMode,
            setMode,
            cancel: cancelListenSystem,
            init () {
                setMode(getMode())
            },
            ...isToneModeObj,
            ...isInnerModeObj
        } as ToneManager<T>
    }

    return false
}
