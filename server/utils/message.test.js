const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Vishal';
        let text = 'Hey there!';

        let msgObject = generateMessage(from, text);
        expect(msgObject).toMatchObject({from, text});
        expect(typeof msgObject.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = 'Krunal';
        let latitude = 12.90;
        let longitude = -75.60;

        let msgObject = generateLocationMessage(from, latitude, longitude);
        expect(msgObject.from).toBe(from);
        expect(msgObject.url).toBe(`https://www.google.com/maps/?q=${latitude},${longitude}`);
        expect(typeof msgObject.createdAt).toBe('number');
    });
});