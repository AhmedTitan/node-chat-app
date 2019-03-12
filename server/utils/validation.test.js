const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should validate the string', () => {
        var oriString = isRealString('name');
        var whiteSpaces = isRealString('     ');
        var emptyString = isRealString('');
        var number = isRealString(12);

        expect(oriString).toBe(true);
        expect(whiteSpaces).toBe(false);
        expect(emptyString).toBe(false);
        expect(number).toBe(false);
    });
});