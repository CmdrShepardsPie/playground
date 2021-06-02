let x = 2;
let y = 8;
const a = function(b) { return function(c) { return x + y + Math.abs(b) + c; } };

// Statement will go here
y = 4;

const fn = a(x);
x = 4;
// 4 + 8 + 2 + ([0-9.99])
//    12 + 2 + ([0-9.99])
//        14 + ([0-9.99])
//             ([14-23.99])

// 4 + 4 + 2 + ([0-9.99])
//     8 + 2 + ([0-9.99])
//        10 + ([0-9.99])
//             ([14-23.99])

console.log(fn(Math.random() * 10));
