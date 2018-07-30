const expect = require('expect');
const  { Users } = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '123',
            name: 'Vishal',
            room: 'Room-A'
        }, {
            id: '456',
            name: 'Kunnu',
            room: 'Room-B'
        }, {
            id: '789',
            name: 'Anil',
            room: 'Room-A'
        }];
    });

    it('should add a new user', () => {
        let users = new Users();
        let userObj = {
            id: '1234',
            name: 'Vishal',
            room: 'Gang'
        };

        let res = users.addUser('1234', 'Vishal', 'Gang');
        expect(users.users).toEqual([userObj]);
    });

    it('should remove a user', () => {
        users.removeUser('123');
        expect(users.users).not.toMatchObject({
            id: '123',
            name: 'Vishal',
            room: 'Room-A'
        });
    });
    
    it('should not remove a user', () => {
        users.removeUser('777');
        expect(users.users).toEqual([{
            id: '123',
            name: 'Vishal',
            room: 'Room-A'
        }, {
            id: '456',
            name: 'Kunnu',
            room: 'Room-B'
        }, {
            id: '789',
            name: 'Anil',
            room: 'Room-A'
        }]);
    });

    it('should get a user', () => {
        let user = users.getUser('123');
        expect(user.name).toBe('Vishal');
    });

    it('should not get a user', () => {
        let user = users.getUser('777');
        expect(user).toBeFalsy();
    });

    it('should get list of users in Room-A', () => {
        let names = users.getUserList('Room-A');
        expect(names).toEqual(['Vishal','Anil']);
    });

    it('sshould get list of users in Room-B', () => {
        let names = users.getUserList('Room-B');
        expect(names).toEqual(['Kunnu']);
    });
});