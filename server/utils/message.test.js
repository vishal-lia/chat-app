const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Vishal';
        let text = 'Hey there!';

        let msgObject = generateMessage(from, text);
        expect(msgObject).toMatchObject({from, text});
        expect(typeof msgObject.createdAt).toBe('number');
    });
});