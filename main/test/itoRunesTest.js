const {int2Chars} = require('../helper');
const charSpace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
console.log(int2Chars(1, charSpace));
console.log(int2Chars(2, charSpace));

console.log(int2Chars(50, charSpace));
console.log(int2Chars(51, charSpace));