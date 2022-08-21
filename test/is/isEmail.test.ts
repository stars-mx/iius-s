import { isEmail } from '../../src'

describe('isEmail function test map', () => {
    test('right email account', () => {
        const result = isEmail('786379180@qq.com')
        expect(result).toBeTruthy()
    })

    test('error emial account', () => {
        const result = isEmail('78637918011.com')
        expect(result).toBeFalsy()
    })
})
