/* module.exports vs export lecture 15 */

// so we will get changes in obj1 even though we make changes in obj2.
// this is because when we copy one object to another they both point to the same memory location.
// changes in one will make the same changes in another
// const obj1 = {
//   name: 'Bruce-wayne',
// };
// const obj2 = obj1;
// obj2.name = 'Clark-Kent';
// console.log(obj1.name); // Clark-kent

// now in the below case if change the receiving obj2 object to let and then assign another object to it. the same reference to one object is broken.
const obj1 = {
  name: 'Bruce-wayne',
};
let obj2 = obj1;
obj2 = {
  name: 'Clark-kent',
};
console.log(obj1.name); // Bruce-wayne
