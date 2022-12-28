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

// // watch mode
// console.log("Hello world")
// now update
// console.log('Hello world of enemies');

/* lecture 19 Path Module */

// we can load the path module as below
// const path = require('node:path');

// console.log(__filename);
// // C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\index.js
// console.log(__dirname);
// //C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs

// // basename represent the last portion of __filename and __dirname
// console.log(path.basename(__filename));
// // index.js
// console.log(path.basename(__dirname));
// // nodejs

// // extname represent the extension of files
// console.log(path.extname(__filename));
// // .js
// console.log(path.extname(__dirname));
// // it will show empty string as it is a directory with no extension

// // parse returns an object which represents the significant properties of the path
// console.log(path.parse(__filename));
// // {
// //   root: 'C:\\',
// //   dir: 'C:\\Users\\muhammada\\Desktop\\react_training\\vishwas_react_course\\nodejs_vishwas_course\\nodejs',
// //   base: 'index.js',
// //   ext: '.js',
// //   name: 'index'
// // }

// // format is converting the parsed object back to the original path. the parameter to `format` will be something like `path.format(path.parse(__filename))`
// console.log(path.format(path.parse(__filename)));

// // isAbsolute
// console.log(path.isAbsolute(__filename)); // true
// console.log(path.isAbsolute('./data.json')); // false

// // path.join
// console.log(path.join('folder1', 'folder2', 'index.html'));
// // folder1\folder2\index.html
// console.log(path.join('\folder1', 'folder2', 'index.html'));
// // ♀older1\folder2\index.html  (this is weird, so we have to use forward slash only, but for windows the output will change to backward slash)
// console.log(path.join('/folder1', 'folder2', 'index.html'));
// // \folder1\folder2\index.html
// console.log(path.join('/folder1', '//folder2', 'index.html'));
// // \folder1\folder2\index.html
// console.log(path.join('/folder1', '//folder2', '../index.html'));
// // \folder1\index.html
// console.log(path.join(__dirname, 'data.json'));
// // C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\data.json

// // path.resolve
// console.log(path.resolve('folder1', 'folder2', 'index.html'));
// // C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\folder1\folder2\index.html
// console.log(path.resolve('\folder1', 'folder2', 'index.html'));
// // C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\♀older1\folder2\index.html
// console.log(path.resolve('/folder1', 'folder2', 'index.html'));
// // C:\folder1\folder2\index.html
// console.log(path.resolve('/folder1', '//folder2', 'index.html'));
// // C:\folder2\index.html
// console.log(path.resolve('/folder1', '//folder2', '../index.html'));
// // C:\index.html
// console.log(path.resolve(__dirname, 'data.json'));
// // C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\data.json

/* lecture 21 Events Module (Built-in node modules) */
// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();
// emitter.on('order-pizza', () => { // responding the the event
//   console.log('order received - baking a pizza');
// });
// emitter.emit('order-pizza'); // dispatching event

// // passing the arguments with event
// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();

// emitter.on('order-pizza', (size, toppings) => {
//   // responding the the event
//   console.log(`order received - baking a ${size} pizza with ${toppings}`);
// });

// emitter.on('order-pizza', (size) => {
//   if (size === 'large') {
//     console.log('Serving complementary drinks');
//   }
// });
// emitter.emit('order-pizza', 'large', 'mashrooms'); // dispatching event

// // Registering multiple listener for the same event
// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();

// emitter.on('order-pizza', (size, toppings) => {
//   // responding the the event
//   console.log(`order received - baking a ${size} pizza with ${toppings}`);
// });

// emitter.on('order-pizza', (size) => {
//   if (size === 'large') {
//     console.log('Serving complementary drinks');
//   }
// });

// console.log("Do work before event occur in the system")

// emitter.emit('order-pizza', 'large', 'mashrooms'); // dispatching event

// // Listeners waiting for the event to occur
// const EventEmitter = require('node:events');
// const emitter = new EventEmitter();

// emitter.on('order-pizza', (size, toppings) => {
//   // responding the the event
//   console.log(`order received - baking a ${size} pizza with ${toppings}`);
// });

// emitter.on('order-pizza', (size) => {
//   if (size === 'large') {
//     console.log('Serving complementary drinks');
//   }
// });

// console.log('Do work before event occur in the system');

// emitter.emit('order-pizza', 'large', 'mashrooms'); // dispatching event

// /* lecture 22 Extending from EventEmitter */
// const PizzaShop = require('./pizza-shop');

// // instantiate the imported class
// const pizzaShop = new PizzaShop();
// pizzaShop.on('order', (size, toppings) => {
//   console.log(`order received - baking a ${size} pizza with ${toppings}`);
// });

// // we can now use the methods of PizzaShop class using the instance pizzaShop
// pizzaShop.order('large', 'mashrooms');
// pizzaShop.displayOrderNumber();

// /* lecture 22 Extending from EventEmitter */
// // for DrinkMachine class
// const PizzaShop = require('./pizza-shop');
// const DrinkMachine = require('./drink-machine');

// // instantiate the imported class
// const pizzaShop = new PizzaShop();
// const drinkMachine = new DrinkMachine();

// pizzaShop.on('order', (size, toppings) => {
//   console.log(`order received - baking a ${size} pizza with ${toppings}`);
//   drinkMachine.serveDrink(size);
// });

// // we can now use the methods of PizzaShop class using the instance pizzaShop
// pizzaShop.order('large', 'mashrooms');
// pizzaShop.displayOrderNumber();

// /* lecture 24 Streams and Buffers */
// // const buffer = new Buffer.from("Vishwas", "utf-8") // utf-8 is default encoding so optional
// const buffer = new Buffer.from('Vishwas');
// console.log(buffer);
// // output
// // <Buffer 56 69 73 68 77 61 73> // this a raw binary data in Hexadecimal format
// console.log(buffer.toJSON());
// // output
// // {
// //   type: 'Buffer',
// //   data: [
// //      86, 105, 115,
// //     104, 119,  97,
// //     115
// //   ]
// // } // this is utf encoded data
// console.log(buffer.toString())
// // output "Vishwas"

// // writing to buffer
// const buffer = new Buffer.from('Vishwas'); // here buffer is created with 6 slots
// // buffer.write('code');
// // console.log(buffer.toString()); // codewas (first 4 slots are replaced)

// buffer.write('codevolution');
// console.log(buffer.toString()); // codevol (as we have only 7 available slots while creation)

// /* lecture 26 fs Module */
// const fs = require('node:fs');
// // reading file content synchronously.
// const fileContents = fs.readFileSync('./file.txt');
// // it gives the Buffer output in binary data
// console.log(fileContents); // <Buffer 48 65 6c 6c 6f 20 43 6f 64 65 76 6f 6c 75 74 69 6f 6e>

// // get data synchronously in human readable format add utf-8 encoding
// const fs = require('node:fs');
// // reading file content synchronously.
// const fileContents = fs.readFileSync('./file.txt', 'utf-8');
// console.log(fileContents); // Hello Codevolution

// // get data Asynchronously in binary format
// const fs = require('node:fs');
// // reading file content Asynchronously. error first callback pattern
// fs.readFile('./file.txt', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data); // <Buffer 48 65 6c 6c 6f 20 43 6f 64 65 76 6f 6c 75 74 69 6f 6e>
//   }
// });

// // get data Asynchronously in human readable format
// const fs = require('node:fs');
// // reading file content Asynchronously. error first callback pattern
// fs.readFile('./file.txt', 'utf-8', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data); // Hello Codevolution
//   }
// });

// // To prove readFile method is Asynchronous
// const fs = require('node:fs');
// console.log('first');
// const fileContent = fs.readFileSync('./file.txt', 'utf-8');
// console.log(fileContent);
// console.log('second');
// fs.readFile('./file.txt', 'utf-8', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data); // Hello Codevolution
//   }
// });
// console.log('third');

// writing to the file synchronously
const fs = require('node:fs');
fs.writeFileSync('./greet.txt', 'Hello World');

// // writing to the file Asynchronously
// fs.writeFile('./greet.txt', 'Hello Vishwas!', (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('file written');
//   }
// });

// appending the new string while writing to file
// writing to the file Asynchronously
fs.writeFile('./greet.txt', ' Hello Vishwas!', { flag: 'a' }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log('file written');
  }
});
