// /* ES Modules lecture 16 */
// const add = (a, b) => {
//   return a + b;
// };
// // in ES Module we export as below
// export default add;

// // second pattern of export
// export default (a, b) => {
//   return a + b;
// };

// // third pattern of export for more than one function
// const add = (a, b) => {
//   return a + b;
// };

// const subtract = (a, b) => {
//   return a - b;
// };

// export default {
//   add,
//   subtract,
// };

// fourth pattern of export for more than one function
export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};
