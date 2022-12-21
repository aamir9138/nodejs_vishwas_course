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
const path = require('node:path');

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

// path.resolve
console.log(path.resolve('folder1', 'folder2', 'index.html'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\folder1\folder2\index.html
console.log(path.resolve('\folder1', 'folder2', 'index.html'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\♀older1\folder2\index.html
console.log(path.resolve('/folder1', 'folder2', 'index.html'));
// C:\folder1\folder2\index.html
console.log(path.resolve('/folder1', '//folder2', 'index.html'));
// C:\folder2\index.html
console.log(path.resolve('/folder1', '//folder2', '../index.html'));
// C:\index.html
console.log(path.resolve(__dirname, 'data.json'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\data.json
