const expext = require('expect');
const { isValidString } = require('./validate');

describe('isValidString', () => {
    it('should reject non-string values', () => {
        let str = 12345;
        let res = isValidString(str);
        expext(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let str = '     ';
        let res = isValidString(str);
        expext(res).toBe(false);
    });

    it('should allow string with non-space value', () => {
        let str = 'A valid string';
        let res = isValidString(str);
        expext(res).toBe(true);
    });
});