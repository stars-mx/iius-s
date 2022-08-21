import { isURL } from '../../src'

describe('isURL function test map', () => {
    test('test http://baidu.com', () => {
        const result = isURL('http://baidu.com')
        expect(result).toBeTruthy()
    })

    test('test https://baidu.com', () => {
        const result = isURL('https://baidu.com')
        expect(result).toBeTruthy()
    })

    test('test www.baidu.com', () => {
        const result = isURL('www.baidu.com')
        expect(result).toBeFalsy()
    })

    test('test baidu.com', () => {
        const result = isURL('baidu.com')
        expect(result).toBeFalsy()
    })
})
