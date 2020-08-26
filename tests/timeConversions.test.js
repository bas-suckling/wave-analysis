const {convertUnixTime} = require('../server/data/dataFunctions/timeConversions')

test('Is test suite working?', function() {
    let expected = 4
    let actual = (2+2)

    expect(actual).toEqual(expected)

} )

test('converts Date format to unix', function() {

    let expected = 1594050160000
    let actual = convertUnixTime('2020-07-07 03:42:40') 

    expect (actual).toBe(expected)
} )