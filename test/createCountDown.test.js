const { pick } = require('lodash')

function padZero (n) {
    if (!Number.isInteger(n)) {
        return String(n)
    }
    return (n < 10 ? `0${n}` : String(n))
}

function createCountDown (time) {
    return {
        year: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12))),
        month: padZero(Math.floor(time / (1000 * 60 * 60 * 24 * 30))),
        day: padZero(Math.floor(time / (1000 * 60 * 60 * 24))),
        hour: padZero(Math.floor((time / (1000 * 60 * 60)) % 24)),
        minute: padZero(Math.floor((time / (1000 * 60)) % 60)),
        second: padZero(Math.floor((time / 1000) % 60))
    }
}

const createCutDown = (time) => {
    const timer = setInterval(() => {
        const now = +new Date()
        const diff = time - now
        if (diff < 0) {
            return clearInterval(timer)
        }
        const { year, month, day, hour, minute, second } = createCountDown(diff)

        console.log(`${year}/${month}/${day} ${hour}:${minute}:${second}`)
    }, 1000)

    return () => {
        clearInterval(timer)
    }
}

const cancel = createCutDown(+new Date('2022/08/21 00:00:00'))
