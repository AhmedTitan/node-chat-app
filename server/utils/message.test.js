const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a message object', () => {
        var from = 'user';
        var text = 'test message';
        var genObject = generateMessage(from, text);
        
        expect(genObject).toMatchObject({from, text});
        expect(genObject.createdAt).toBeTruthy();
    });
});