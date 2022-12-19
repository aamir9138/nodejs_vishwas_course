// require('./add');

// const add = require('./add');
// console.log('Hello world from index.js');

// const sum = add(1, 2);
// console.log(sum);

// const sum2 = add(3, 5);
// console.log(sum2);

/* Down Below is about Module Scope lecture 12*/
// require('./batman');
// require('./superman');

/* Down Below is about Module caching lecture 13*/
// const superHero = require('./superHero');
// console.log(superHero.getName());
// superHero.setName('Superman');
// console.log(superHero.getName());

// const newSuperHero = require('./superHero');
// console.log(newSuperHero.getName());

// // when the module is exported as a class then
// const SuperHero = require('./superHero');

// // create an instance of class now
// const batman = new SuperHero('batman');
// console.log(batman.getName());
// batman.setName('Bruce-wayne');
// console.log(batman.getName());

// //create another instance of the class
// const superman = new SuperHero('superman');
// console.log(superman.getName());
// superman.setName('Henry-Cavill');
// console.log(superman.getName());

/* Down Below is about different import and export patterns lecture 14 */

// // for single import
// const add = require('./math');
// console.log(add(7, 7));

// // for multiple function imports
// const math = require('./math');
// console.log(math.add(2, 3));
// console.log(math.subtract(5, 1));

// // we can destructure the math object as below
// const math = require('./math');
// const { add, subtract } = math;
// console.log(add(2, 3));
// console.log(subtract(5, 1));

/* module.exports vs exports lecture 15*/

// // for multiple function imports
// const math = require('./math');
// console.log(math.add(2, 3));
// console.log(math.subtract(5, 1));

// /* Importing JSON lecture 17 */
// const data = require('./data.json');
// console.log(data);
// console.log(data.name);

// watch mode
// console.log("Hello world")
// now update
console.log('Hello world of enemies');
