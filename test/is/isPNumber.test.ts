import { isPNumber } from '../../src'

describe('isPNumber function test map', () => {
    test('right phone number', () => {
        const result = isPNumber('15918821165')
        expect(result).toBeTruthy()
    })

    test('error phone number', () => {
        const result = isPNumber('78637918011.com')
        expect(result).toBeFalsy()
    })
})
