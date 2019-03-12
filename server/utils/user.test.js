const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'titan',
            room: 'dota'
        }, {
            id: 2,
            name: 'black',
            room: 'dota'
        }, {
            id: 3,
            name: 'AG',
            room: 'pubg'
        }];
    });

    it('should add new user', () => {
        var person = users.addUser(4, 'LM10', 'pubg');

        expect(users.users.length).toBe(4);
        expect(person).toMatchObject({
            id: 4,
            name: 'LM10',
            room: 'pubg'
        });
    });

    it('should return names of the users', () => {
        var names = users.getUsersList('dota');

        expect(names).toMatchObject(['titan', 'black']);
    });

    it('should return user object for the given id', () => {
        var user = users.getUser(1);

        expect(user).toMatchObject({
            id: 1,
            name: 'titan',
            room: 'dota'
        });
    });

    it('should not return user object if given id is invalid', () => {
        var user = users.getUser(5);
        expect(user).toBeFalsy();
    });

    
    it('should remove the user', () => {
        var user = users.removeUser(1);

        expect(user).toMatchObject({
            id: 1,
            name: 'titan',
            room: 'dota'
        });
    });

    it('should not remove the user if id is wrong', () => {
        var user = users.removeUser(4);
        expect(user).toBeFalsy();
    });
});