const moment = require('moment');

let date = moment();
date.add(2, 'years').subtract(4, 'months');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));