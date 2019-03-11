const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a message object', () => {
        var from = 'user';
        var text = 'test message';
        var genObject = generateMessage(from, text);
        
        expect(genObject).toMatchObject({from, text});
        expect(genObject.createdAt).toBeTruthy();
    });
});
describe('generateLocationMessage', () => {
    it('should generate a Location object', () => {
        var from = 'user';
        var latitude = 1;
        var longitude = 2;
        var genLocObj = generateLocationMessage(from, latitude, longitude);

        expect(genLocObj).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
        expect(genLocObj.createdAt).toBeTruthy();
    });
});