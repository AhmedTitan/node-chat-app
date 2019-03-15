class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
       var user = this.getUser(id);
       if(user){
        this.users = this.users.filter((user) => user.id !== id);
       }
       return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    getUsersList(room){
        var users = this.users.filter((user) => user.room === room);
        return users.map((user) => user.name);
    }

    isAvailableName(str){
        return this.users.filter((user) => user.name === str)[0];
    }

    getActiveRooms(){
        var rooms = this.users.map((user) => user.room);
        var retRooms = [];
        rooms.forEach(element => {
            if(!retRooms.filter((room) => room === element)[0]){
                retRooms.push(element);
            }
        });
        return retRooms;

    }
}

module.exports = {Users};