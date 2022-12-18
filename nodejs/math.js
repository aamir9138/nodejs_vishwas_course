/* different import export patterns lecture 14*/

// const add = (a, b) => {
//   return a + b;
// };

// const subtract = (a, b) => {
//   return a - b;
// };

// // 1. if we hava a single function we can export as before like below
// module.exports = add;

// // 2. exporting functions as an object
// module.exports = {
//   add: add,
//   subtract: subtract,
// };

// //3. ES6 shorthand for the above object
// module.exports = {
//   add,
//   subtract,
// };

// //4. export each function separately
// module.exports.add = (a, b) => {
//   return a + b;
// };

// module.exports.subtract = (a, b) => {
//   return a - b;
// };

// // 5. export each function separately without module but is not a good practise
// exports.add = (a, b) => {
//   return a + b;
// };

// exports.subtract = (a, b) => {
//   return a - b;
// };

/* module.exports vs exports lecture 15*/
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};
exports = { add, subtract };
