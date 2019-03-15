var rooms;

var getRooms = function(){
    var x = new XMLHttpRequest();
    x.onload = function(){
        if( x.status === 200 && x.readyState === 4){
            return this.responseText;            
        }
    }
    x.open('POST', 'http://localhost:3000/rooms');
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send("name=dominic$message=abc");
};


