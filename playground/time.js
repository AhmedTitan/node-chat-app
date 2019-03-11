const moment = require('moment');

// var date = new Date().getMonth();
// console.log(date);

// var date = moment();
// console.log(date.format('MMM Do, YYYY'));

var date = new Date().getTime();
var createdAt = moment().valueOf();
var time = moment(createdAt);
console.log(date);
console.log(createdAt);
console.log(time.format('h:mm a'));