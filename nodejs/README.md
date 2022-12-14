## Node.js course notes from Vishwas youtube channel

### Introduction

- node.js is cross-platform
- 1995 Netscape created JavaScript
- 1996 Microsoft created JScript
- JavaScript and JScript were not compatible
- 1996 Netscape submitted JavaScript to ECMA International for standarization
- ECMAScript refers to the standard language whereas JavaScript is what we use in practice and builds on top of ECMAScript

---

### JavaScript Engine

- JavaScript engine executes JavaScript code
- JavaScript engines are typically developed by web browser vendors. each vendor has one

| Browser Vendor  | JavaScript Engine |
| --------------- | ----------------- |
| Google Chrome   | V8                |
| Apple Safari    | JavaScriptCore    |
| Mozilla Firefox | SpiderMonkey      |
| Microsoft Edge  | Chakra            |

### Google Chrome JavaScript Engine V8

- v8 is written in C++
- v8 can run standalone or can be embedded into any C++ program
- visit [chrome v8 engine](https://v8.dev/) for details

---

### JavaScript Runtime

JavaScript runtime is an environment which provides all the necessary components in order to use and run a JavaScript program

- A JavaScript Engine is one component in the JavaScript Runtime
- JavaScript Runtime has other modules in addition to the JavaScript Engine
- Node.js can run the JavaScript program outside the browser

---

#### Javascript Runtime Repository structure

- This repo [JavaScript Runtime Repo](https://github.com/nodejs/node) contains code for JavaScript runtime
- This folder [dependencies](https://github.com/nodejs/node/tree/main/deps) contains dependencies
- uv(libuv) and v8 are the major dependencies present in deps folder
- The [src folder](https://github.com/nodejs/node/tree/main/src) contains code of nodejs in C++
- The [lib folder](https://github.com/nodejs/node/tree/main/lib) contains the JS code which access the C++ feature for example fs.js (to access file system)

---

### Few words about Node.js

- Node.js is not a language, it is not a framework
- Node.js runtime unlike the browser runtime doesnot has access to the web apis. there is no `window` or `document` object when working with Node.js
- with Nodejs we cannot interact with DOM, or other Web Platform Apis like Cookies. we don't have the document, window and all the other objects that are provided by the browser.
- with browser we don't have all the nice APIs that Nodejs provides through its modules. for example filesystem access functionality
- with Nodejs you control the envirnment
- with browser you are the mercy of user choice

---

### zooming vscode editor text

1. create `.vscode` folder
2. inside `.vscode` create `settings.json` file
3. write

```json
{
  "window.zoomLevel": 2 // default is 0
}
```

---

### Hello World program

#### on Terminal

1. `node -v`
2. `node`
3. then we can write javascript commands

```
  console.log("Hello world")
  2+2
```

node REPL:
Read
Evaluate
Print
Loop

#### writing JavaScript code in a file:

1. create index.js file
2. write the below code

```
console.log('Hello world from index.js')
```

3. in terminal run by executing

```
node index.js
```

---

### Modules

- A module is an encapsulated and reusable chunk of code that has its own context
- In node.js, each file is treated as a separate module

#### Types of Modules

    1. Local Modules - Modules that we create in our application
    2. Built-in Modulues - Modules that Node.js ships with out of the box
    3. Third party Modules - Modules written by other developers that we can use in our application

---

#### Local Modules

Modules that we create and use in our Applications

- in node.js each file is a module that is isolated by default
- to load a module into another file, we use the require function
- when index.js is executed, the code in the module is also executed
- if the file we are requiring is a javascript file, we can skip specifying the extension and node.js will infer it on our behalf

```
  // index.js file
  require('./add');
  console.log('Hello world from index.js');
```

```
  // add.js file below
  const add = (a, b) => {
  return a + b;
  };
  const sum = add(2, 3);
  console.log(sum);
```

- let see in the next section how to expose certain things from the module not the full module

#### CommonJS

- CommonJS is a standard that states how a module should be structured and shared
- Node.js adopted CommonJS when it started out and is what you will see in code bases
- "./" refers to the same folder

---

#### Module Exports:

- index.js file below

```
  const add = require('./add');
  console.log('Hello world from index.js');

  const sum = add(1, 2);
  console.log(sum);

  const sum2 = add(3, 5);
  console.log(sum2);
```

- add.js file exported as module below

```
  // Module Exports to reuse the function as many times as we want
  const add = (a, b) => {
    return a + b;
  };
  module.exports = add;
```

---

### Module Scope:

- Each loaded module in Node.js is wrapped with an IIFE that provides private scoping of code
- IIFE allows us to repeat variable or function names without any conflicts

```
  require('./batman');
  require('./superman');
```

The content two files are down below

```
  const superHero = 'Batman';
  console.log(superHero);
```

```
  const superHero = 'Superman';
  console.log(superHero);
```

#### IIFE (Immediately Invoked Function Expression) in Node.js

- Before a module's code is executed, Node.js will wrap it with a function wrapper that provides module scope

```
  /* IIFE functions */
  (function () {
    const superHero = 'Superman';
    console.log(superHero);
  })();
```

```
  (function () {
    const superHero = 'Batman';
    console.log(superHero);
  })();
```

- This saves us from having to worry about conflicting variables or functions
- There is proper encapsulation and reusability is unaffected

### Module Wrapper

- Every module in node.js gets wrapped in an IIFE before being loaded
- IIFE helps keep top-level variables scoped to the module rather than the global object
- The IIFE that wraps every module contains 5 parameters which are pretty important for the functioning of a module

#### How parameters and arguments work with simple IIFE in Javascript

```
/* How parameters and arguments work in simple IIFE in javascript */
/*  message == parameter
    "Hello" and "Hey" == argument
    output:
      $ node iife
      Hello Superman
      Hey Batman*/

(function (message) {
  const superHero = 'Superman';
  console.log(message, superHero);
})('Hello');

(function (message) {
  const superHero = 'Batman';
  console.log(message, superHero);
})('Hey');
```

#### How each Module is wrapped

- here is our Module code

```
const superHero = 'Batman';
console.log(superHero);
```

- here is the same code as above wrapped in an IIFE

```
(function () {
  const superHero = 'Batman';
  console.log(superHero);
})
```

- here is the final code with parameters. There are five in total. these are exports, require, module, **filename, **dirname. node.js wrapped each module like IIFE with these global looking parametes which are actually specific to the the Module

```
(function (exports, require, module, __filename, __dirname) {
  const superHero = 'Batman';
  console.log(superHero);
})
```

## lecture 13 Module Caching

1. create a file `superHero.js`
2. create a class in it `class SuperHero`
3. create `getName` and `setName` methods
4. an error encounterd `// const getName() --- a class member cannot have a const keyword`
5. export the class with a default value of "Batman"
6. we must use `new` keyword while exporting a class

```
class SuperHero {
  constructor(name) {
    this.name = name;
  }
  // const getName() --- a class member cannot have a const keyword
  getName(){
    return this.name;
  };
  setName(name) {
    this.name = name;
  }
}

module.exports = new SuperHero('Batman');
```

7. in index.js file require the `superHero.js` module
   `const superHero = require('./superHero');`
8. it will return an object
9. console log the name `console.log(superHero.getName());`
10. setName to superman and log the name again

```
superHero.setName('Superman');
console.log(superHero.getName());
```

11. require the same module again and create a new instance

```
const newSuperHero = require('./superHero');
console.log(newSuperHero.getName()); // superman
```

12. the results are now

```
Batman
Superman
Superman
```

13. This is because of caching. when we require a new module it is loaded and cached for subsequent loading !!important.

### How to deal with separate instances of superHero module

1. As of now when we create a new instance it is taking the last cached value which is set by the setName method.
2. for this instead of export an instance in superHero module. export the whole class as follows

```
module.exports = SuperHero; // exporting the class. see the altered index.js code also for this
```

3. in index.js file the code is now

```
// when the module is exported as a class then
const SuperHero = require('./superHero');

// create an instance of class now
const batman = new SuperHero('batman');
console.log(batman.getName());
batman.setName('Bruce-wayne');
console.log(batman.getName());

//create another instance of the class
const superman = new SuperHero('superman');
console.log(superman.getName());
superman.setName('Henry-Cavill');
console.log(superman.getName());
```

## lecture 14 Import and Export patterns in projects

we will describe a number of patterns used projects code bases online for Import and export

1. for single function export and import

```
// for single import
const add = require('./math');
console.log(add(7, 7));
```

```
// math.js file
const add = (a, b) => {
  return a + b;
};
module.exports = add;
```

2. export the method as an object

```
/* different import export patterns */
// for multiple function exporting as an object

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

// exporting functions as an object
module.exports = {
  add: add,
  subtract: subtract,
};
```

3. ES6 shorthand for the exported object

```
// ES6 shorthand for the above object
module.exports = {
  add,
  subtract,
};
```

4. imported and used the functions in index.js file

```
/* Down Below is about different import and export patterns lecture 14 */
const math = require('./math');
console.log(math.add(2, 3));
console.log(math.subtract(5, 1));
```

5. we can also export each function separately as below

```
// export each function separately
module.exports.add = (a, b) => {
  return a + b;
};

module.exports.subtract = (a, b) => {
  return a - b;
};
```

5. we can remove the module from above and can write exports.add and exports.subtract only. it will work. so exports is a reference to the module.exports object. but in some cases it can cause bug. so the best practice is to use module.exports.add and module.exports.subtract

```
// export each function separately without module but is not a good practise
exports.add = (a, b) => {
  return a + b;
};

exports.subtract = (a, b) => {
  return a - b;
};
```

6. we can also destructure the math object at the import as below

```
// we can destructure the math object as below
const math = require('./math');
const { add, subtract } = math;
console.log(add(2, 3));
console.log(subtract(5, 1));
```

## lecture 15 module.exports vs exports reasoning

1. create `object-reference.js` file
2. write this code in the file and run `node object-reference.js`
3. so we will get changes in obj1 even though we make changes in obj2. this is because when we copy one object to another they both point to the same memory location. changes in one will make the same changes in another

```
/* module.exports vs export lecture 15 */
const obj1 = {
  name: 'Bruce-wayne',
};

const obj2 = obj1;
obj2.name = 'Clark-Kent';

console.log(obj1.name); // Clark-kent because object pass by reference
```

4. now in the below case if change the receiving obj2 object to `let` and then assign another object to it. the same reference to one object is broken.

```
// now in the below case if change the receiving obj2 object to let and then assign another object to it. the same reference to one object is broken.
const obj1 = {
  name: 'Bruce-wayne',
};
let obj2 = obj1;
obj2 = {
  name: 'Clark-kent',
};
console.log(obj1.name); // Bruce-wayne
```

5. if we write exports object like below it will give error. with module.exports will be fine.

```
/* module.exports vs exports lecture 15*/
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};
exports = {  // only exports is not correct
  add: add,
  subtract: subtract,
};
```

---

<!-- ES Modules lecture 16 -->

### CommonJS last comments

1. Each file is treated as a module
2. Variables, functions, classes, etc. are not accessible to other files by default
3. Explicitly tell the module system which parts of your code should be exported via `module.exports` or `exports`
4. To import code into a file, use the require() function.

---

## lecture 16 ES Modules

1. another method for importing and exporting modules besides CommonJS method.
2. At the time Node.js was created, there was no built-in module system in javascript
3. Node.js defaulted to commonJS as its module system.
4. As of ES2015, JavasScript does have a standardized module system as part of the language itself
5. That module system is called EcmaScript Modules or ES Modules or ESM for short

### file extension for ES Module

The file extension is `.mjs` and not `.js`

### import and export of ES Module with examples

1. create a file `main.mjs`
2. create a second file `math-esm.mjs` for the math module
3. within the file the code now will be

```
/* ES Modules lecture 16 */
const add = (a, b) => {
  return a + b;
};
// in ES Module we export as below
export default add;
```

4. so the important line is export here. we export like this in ES Modules
5. and import this module in `main.mjs` file as below

```
/* ES Modules lecture 16 */

// in ES Modules we import as below
import add from './math-esm.mjs';

console.log(add(4, 3));
```

6. in terminal run `node main.mjs`
7. second pattern of export is as below

```
// second pattern of export
export default (a, b) => {
  return a + b;
};
```

8. third pattern if we have more than one function and want to export the code is below

```
// third pattern of export for more than one function
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

export default {
  add,
  subtract,
};
```

and the `main.mjs` would be as below

```
// third pattern for multiple function import
import math from './math-esm.mjs';

console.log(math.add(5, 5));
console.log(math.subtract(5, 5));
```

9. we can also destructure the imports as below

```
// destructing the imports
import math from './math-esm.mjs';

const { add, subtract } = math;
console.log(add(5, 5));
console.log(subtract(5, 5));
```

10. we can import the exported function by any name
11. fourth pattern of exporting and importing is as below

```
// fourth pattern of export for more than one function
export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};

// fourth pattern of importing
import * as math from './math-esm.mjs';

const { add, subtract } = math;
console.log(add(2, 4));
console.log(subtract(6, 5));
```

12. fifth pattern of import is to destructure at the import line itselt as below

```
// fifth pattern of importing
import { add, subtract } from './math-esm.mjs';
console.log(add(2, 4));
console.log(subtract(6, 5));
```

### ES Modules Summary

1. ES Modules is the ECMAScript standart for modules
2. It was introduced with ES2015
3. Node.js 14 and above support ES Modules
4. Instead of `module.exports`, we use the `export` keyword
5. The export can be `default` or `named export`
6. We import the exported variables or functions using the import keyword
7. if it is a `default export`, we can assign any name while importing
8. if it is a `named export`, the import name must be the same

## lecture 17 Importing JSON

- JSON -- JavaScript Object Notation
- A data interchange format commonly used with web servers
- create a file `data.json`

```
{
  "name": "Bruce Wayne",
  "address": {
    "street": "Wayne Manor",
    "city": "Gotham"
  }
}
```

- in `index.js` import the JSON data as below

```
/* Importing JSON lecture 17 */
const data = require('./data.json');
console.log(data);
```

- `nodex index.js` the result is

```
$ node index
{
  name: 'Bruce Wayne',
  address: { street: 'Wayne Manor', city: 'Gotham' }
}
```

- so the JSON format of data is has been parsed to the Object. it is the default behaviour `require` will convert the data in JSON to JavaScript object
- we can now access the name as below

```
console.log(data.name)
```

- it is better to always use extension when require JSON data `require('./data.json')`

### watch mode

- in version 18 node introduces the watch mode
- in the terminal run the `index` file by watch mode

```
node --watch index
```

- so now if we update anything and save the file the changes will appear immediately. no need to run everytime

## lecture 18 Modules

### Types of Modules

1. Local modules - (done in previous lessons)
2. Built-in modules - (we will do now in this section)
3. Third party modules

### Built-in Modules

- Modules that node.js ships with
- Also referred to as core modules
- we still need to import it before we can use it
- the most commonly used are
  1. path
  2. events
  3. fs
  4. stream
  5. http
- the source code for these modules are present in the `lib folder`

## lecture 19 Path Module

- The path module provides utilities for working with file and directory paths
- we can load the module by the below syntax in `index.js` file

```
/* lecture 19 Path Module */

// we can load the path module as below
const path = require("node:path")
```

- the `Path Module` has 14 different properties and methods. but we will use here only 7
- we will use the readily available `__filename` and `__dirname`

```
console.log(__filename);
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\index.js
console.log(__dirname);
//C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs
```

- `__filename` show the file path of index.js file
- `__dirname` shows the directory path of the index.js present

### basename in Path Module

- basename represents the last portion of `__filename` and `__dirname`.

```
console.log(path.basename(__filename));
// index.js
console.log(path.basename(__dirname));
// nodejs
```

### extname in Path Module

- extname represents the extension of the files

```
// extname represent the extension of files
console.log(path.extname(__filename));
// .js
console.log(path.extname(__dirname));
// it will show empty string as it is a directory with no extension
```

### parse in Path Module

- we have a `parse` method which returns an object which represents the significant properties of the path

```
// parse returns an object which represents the significant properties of the path
console.log(path.parse(__filename));
// {
//   root: 'C:\\',
//   dir: 'C:\\Users\\muhammada\\Desktop\\react_training\\vishwas_react_course\\nodejs_vishwas_course\\nodejs',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index'
// }
```

- we can use these properties using the dot notation on parse like `path.parse.name`

### format in Path Module

- it is converting the parsed object back to the original path. the parameter to `format` will be something like `path.format(path.parse(__filename))`

```
// format is converting the parsed object back to the original path. the parameter to `format` will be something like `path.format(path.parse(__filename))`
console.log(path.format(path.parse(__filename)));
```

- so basically it is converting the below thing

```
 {
   root: 'C:\\',
   dir: 'C:\\Users\\muhammada\\Desktop\\react_training\\vishwas_react_course\\nodejs_vishwas_course\\nodejs',
   base: 'index.js',
   ext: '.js',
   name: 'index'
 }
```

to

```
C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\index.js
```

### isAbsolute in Path Module

- it will return either `true` or `false` depends on if the path is Absolute or relative.

```
// isAbsolute
console.log(path.isAbsolute(__filename)); // true
console.log(path.isAbsolute('./data.json')); // false
```

### join in Path Module

- `join` joins all the given path segments togather using the platform specific separator (i.e Mac or windows etc) as delimiter and than normalizes the resulting path

```
// path.join
console.log(path.join('folder1', 'folder2', 'index.html'));
// folder1\folder2\index.html
console.log(path.join('\folder1', 'folder2', 'index.html'));
// ???older1\folder2\index.html  (this is weird, so we have to use forward slash only, but for windows the output will change to backward slash)
console.log(path.join('/folder1', 'folder2', 'index.html'));
// \folder1\folder2\index.html
console.log(path.join('/folder1', '//folder2', 'index.html'));
// \folder1\folder2\index.html (normalizes the path)
console.log(path.join('/folder1', '//folder2', '../index.html'));
// \folder1\index.html (normalizes the path and jumps one folder up)
console.log(path.join(__dirname, 'data.json'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\data.json
```

### resolves in Path Modules

- `path.resolves` method is a method resolves `sequence of paths` or `path segments` into an absolute path
- secanrios :
  1. so if we don't have a forward slash it will take the current directory and add the segments
  2. if we have backward slash with segments it is wrong. even on windows we have to use the forward slash and it will return the path as backward slashes for windows
  3. if we have a forward slash it will create an absolute path from there
  4. in the segments if we have forward slash to the right ones also. it will resolve an absolute path from the right ones

```
// path.resolve
console.log(path.resolve('folder1', 'folder2', 'index.html'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\folder1\folder2\index.html
// (so if we don't have a forward slash it will take the current directory and add the segments)
console.log(path.resolve('\folder1', 'folder2', 'index.html'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\???older1\folder2\index.html
// (if we have backward slash with segments it is wrong. even on windows we have to use the forward slash and it will return the path as backward slashes for windows)
console.log(path.resolve('/folder1', 'folder2', 'index.html'));
// C:\folder1\folder2\index.html
// (if we have a forward slash it will create an absolute path from there)
console.log(path.resolve('/folder1', '//folder2', 'index.html'));
// C:\folder2\index.html
console.log(path.resolve('/folder1', '//folder2', '../index.html'));
// C:\index.html
console.log(path.resolve(__dirname, 'data.json'));
// C:\Users\muhammada\Desktop\react_training\vishwas_react_course\nodejs_vishwas_course\nodejs\data.json
```

## "node:" Protocol

- we can omit `node:` while importing the `path` module in the first line. but using it has benefits

```
const path = require("node:path")
```

- the benefits are :
  1. Makes it perfectly clear that the import is a Node.js builtin module
  2. Makes the import identifier a valid absolute URL
  3. Avoids conflicts for future Node.js built-in modules

## lecture 20 Callback Pattern

- before moving to the next in-built module we will discuss the Callback Pattern first

### Callbacks

- in JavaScript, functions are first class objects
- A function can be passes as an argument to a function
- A function can also be returned as values from other other functions

```
function greet(name){
  console.log(`Hello ${name}`)
}

function higherOrderFunction(callback){
  const name = 'Vishwas'
  callback(name)
}

higherOrderFunction(greet)
```

- Any function that is passed as an argument to another function is called a `callback function` in Javascript

### Higher order function

- The function which accepts a function as an argument or returns a function is called a higher order function

### Callbacks function types

1. synchronous Callback functions
2. Asynchronous Callback functions

### Synchronous callbacks

A callback which executed imediately is called a synchronous callback

```
function greet(name){
  console.log(`Hello ${name}`)
}

function higherOrderFunction(callback){
  const name = 'Vishwas'
  callback(name)
}

higherOrderFunction(greet)
```

The below higher order function are showing the higherorderfunction with synchronous callbacks

```
let numbers = [1,2,3,4,5,6]
numbers.sort((a,b) => a -b)
numbers.map(n => n*2)
numbers.filter(n => n%2 === 0)
```

### Asynchronous callbacks

- A callback that is often used to continue or resume code execution after an asynchronous operation has completed.
- so in Async world Callbacks are used to delay the execution of a function until a particular time or event has occurred
- most of the module in Node.js has an asynchronous nature to prevent blocking of execution
- for example reading data from a file, fetching data from a database or handling a network request

### Asynchronous callbacks in browser

- our first example in browser is an event handler as below picture

  ![Asynchronous callbacks in browser](./pictures/asynchronous_callbacks_in_browser.PNG)

- so from the picture above as you can see the `callback` function will only execute when the user clicks the button.

## lecture 21 Events Module (Built-in Module)

- The events module allows us to work with events in Node.js
- An event is an action or an occurrence that has happened in our application that we can respond to
- Using the events module, we can dispatch our own custom events and respond to those custom events in a non-blocking manner

### Events Module - non-technical scenario

- Let's say you're feeling hungry and head out to Dominos to have pizza
- At the counter, you place your order for a pizza
- When you place the order, the line cook sees the order on the screen and bakes the pizza for you
- we can relate the above steps to the events

1. in the above scenario order being placed is the event
2. baking a pizza is a response to that event

### Event Module - in coding

1. first import the built-in Event module `const EventEmitter = require("node:events")`
2. why are we calling it `EventEmitter` because while importing the events module it returns a class called EventEmitter which encapsulates the functionalites to emit an event and respond to that event.
3. instantiate the return class now. `const emitter = new EventEmitter()`
4. now this `emitter` object can emit events.
5. to emit an event use the `emit` method on the `emitter` object. `emitter.emit()`
6. the method accepts the event name as argument. so lets emit an event call `order-pizza`.

```
emitter.emit("order-pizza")
```

7. to respond to this `order-pizza` event. we need to register a listener. for that we use the `on` method on the `emitter` object.
8. `emitter.on()` accepts two parameters. the first parameter is the `event-name`. the second parameter is the `listener`.
9. a listener is a callback function that gets executed when the corresponding event is emitted.
10. from the previous lecture we know that a callback function allows us to delay execution till the event occur.
11. here the callback function will simply output a console log statement.
12. the `emitter.emit` must be below in the code that `emitter.on`

```
/* lecture 21 Events Module (Built-in node modules) */
const EventEmitter = require('node:events');
const emitter = new EventEmitter();
emitter.on('order-pizza', () => { // responding the the event
  console.log('order received - baking a pizza');
});
emitter.emit('order-pizza'); // dispatching event
```

13. while emitting we can pass arguments in the `emitter.emit`
14. pass arguments as the `size` of `large` and `toppings` of `mashrooms`
15. the listener function in `emitter.on` will automatically receive the arguments.

```
// passing the arguments with event
const EventEmitter = require('node:events');
const emitter = new EventEmitter();
emitter.on('order-pizza', (size, toppings) => {
  // responding the the event
  console.log(`order received - baking a ${size} pizza with ${toppings}`);
});
emitter.emit('order-pizza', 'large', 'mashrooms'); // dispatching event
```

16. we can also register multiple listener for the same event.

```
// Registering multiple listener for the same event
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

emitter.on('order-pizza', (size, toppings) => {
  // responding the the event
  console.log(`order received - baking a ${size} pizza with ${toppings}`);
});

emitter.on('order-pizza', (size) => {
  if (size === 'large') {
    console.log('Serving complementary drinks');
  }
});
emitter.emit('order-pizza', 'large', 'mashrooms'); // dispatching event
```

### Important to note

- By writing this type of code we are not blocking the execution. events allow us to write the code in non-blocking manner.
- so if we have write a function say a console.log statement. it will execute first and the listener will listen for the events to occur. so when the emitter emits the event the event listener will execute only. so in a way listeners are always waiting for the events to occur to execute.

```
// Listeners waiting for the event to occur
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

emitter.on('order-pizza', (size, toppings) => {
  // responding the the event
  console.log(`order received - baking a ${size} pizza with ${toppings}`);
});

emitter.on('order-pizza', (size) => {
  if (size === 'large') {
    console.log('Serving complementary drinks');
  }
});

console.log("Do work before event occur in the system")

emitter.emit('order-pizza', 'large', 'mashrooms'); // dispatching event
```

## lecture 22 Extending from EventEmitter

in this lecture we will know how to built our own module that builds on top of the `EventEmitter` class.

1. create `pizza-shop.js` file
2. create a class `PizzaShop` and export it as below

```
/* lecture 22 Extending from EventEmitter */
class PizzaShop {
  constructor() {
    this.orderNumber = 0;
  }

  order() {
    this.orderNumber++;
  }
  displayOrderNumber() {
    console.log(`Current order number is : ${this.orderNumber}`);
  }
}
// export the class
module.exports = PizzaShop;
```

3. in `index.js` import the class `PizzaShop`. now we can use the methods of `PizzaShop` class here.

```
/* lecture 22 Extending from EventEmitter */
const PizzaShop = require('./pizza-shop');

// instantiate the imported class
const pizzaShop = new PizzaShop();

// we can now use the methods of PizzaShop class using the instance pizzaShop
pizzaShop.order();
pizzaShop.displayOrderNumber(); // current order number: 1
```

so we have a PizzaShop class which has its own properties and methods. However we would like the shop to handle the orders using `event-driven architecture`. i.e using the events module. The solution for that is inheritance. in JavaScript we can extend one class to extend the functionality of another class.

in our case `PizzaShop` class is going to inherit from the `EventEmitter` class.

### inheriting EventEmitter class

To inherit from EventEmitter class. follow the following steps.

1. import `node:events` module. it will return an `EventEmitter` class

```
const EventEmitter = require("node:events")
```

2. extends `PizzaShop` from `EventEmitter` class

```
class PizzaShop extends EventEmitter{
```

3. invoke `super()` inside `constructor()`. This class base inheritance is a feature introduced in ES6.

```
// inheriting the PizzaShop class from EventEmitter class
const EventEmitter = require("node:events")
class PizzaShop extends EventEmitter{
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order() {
    this.orderNumber++;
  }
  displayOrderNumber() {
    console.log(`Current order number is : ${this.orderNumber}`);
  }
}
// export the class
module.exports = PizzaShop;
```

4. We can now use the EventEmitter functionality in PizzaShop class.

```
// inheriting the PizzaShop class from EventEmitter class
const EventEmitter = require('node:events');
class PizzaShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(size, toppings) {
    this.orderNumber++;
    this.emit('order', size, toppings);
  }
  displayOrderNumber() {
    console.log(`Current order number is : ${this.orderNumber}`);
  }
}
// export the class
module.exports = PizzaShop;
```

The index.js file becomes now

```
/* lecture 22 Extending from EventEmitter */
const PizzaShop = require('./pizza-shop');

// instantiate the imported class
const pizzaShop = new PizzaShop();
pizzaShop.on('order', (size, toppings) => {
  console.log(`order received - baking a ${size} pizza with ${toppings}`);
});

// we can now use the methods of PizzaShop class using the instance pizzaShop
pizzaShop.order('large', 'mashrooms');
pizzaShop.displayOrderNumber();
```

### complementary drink class

previously when we have `large` pizza we will serve a complementary drink. for the same functionality we will create here a separate file `drink-machine.js` with `DrinkMachine` class and export the class.

```
class DrinkMachine {
  serveDrink(size) {
    if (size === 'large') {
      console.log('Serving Complementary drink');
    }
  }
}
module.exports = DrinkMachine;
```

The `index.js` file will be

```
/* lecture 22 Extending from EventEmitter */
// for DrinkMachine class
const PizzaShop = require('./pizza-shop');
const DrinkMachine = require('./drink-machine');

// instantiate the imported class
const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizzaShop.on('order', (size, toppings) => {
  console.log(`order received - baking a ${size} pizza with ${toppings}`);
  drinkMachine.serveDrink(size);
});

// we can now use the methods of PizzaShop class using the instance pizzaShop
pizzaShop.order('large', 'mashrooms');
pizzaShop.displayOrderNumber();
```

## lecture 23 Character Sets and Encoding

first understand binary data

### Binary data

An image is presented for this.

![Binary Data](./pictures/binary_data.PNG)

### Character in binary format

V?

- computer will first convert the character to a number, then conbert that number to its binary representation
- computers will first convert V to a number that represents V.
- in console of browser if we write `"V".charCodeAt()` it will gives as `86`
- 86 is the numeric representation of character V.
- it is also called chararcter code.

### how does computer know

how does computer know which character is represented by which number? for that we use `Character Sets`

### Character Sets

![character sets](./pictures/character_sets.PNG)

### Character Encoding

![character encoding](./pictures//character_encoding.PNG)

## lecture 24 Streams and Buffers

### Streams

![streams](./pictures/streams.PNG)

![streams continued](./pictures//streams_continued.PNG)

The question is how exactly this sequence of data move. which brings to our next topic `Buffers`

### Buffers

![buffers](./pictures/buffers.PNG)
![buffers continued](./pictures//buffers_continued.PNG)

### connection of Binary data, character sets and encoding to Buffers

what you should know that node.js provides the buffer feature as a global feature that we can use without importing it. let us create a buffer that holds the string `vishwas`

```
// const buffer = new Buffer.from("Vishwas", "utf-8") // utf-8 is default encoding so optional
const buffer = new Buffer.from('Vishwas');
console.log(buffer);
// output
// <Buffer 56 69 73 68 77 61 73> // this a raw binary data in Hexadecimal format
console.log(buffer.toJSON());
// output
// {
//   type: 'Buffer',
//   data: [
//      86, 105, 115,
//     104, 119,  97,
//     115
//   ]
// } // this is utf encoded data
console.log(buffer.toString())
// output "Vishwas"
```

- we can also write to the buffer.
- when we write to buffer. it will overwrite the first assigned string.
- the buffer can write upto the first assign number of letters not more than that. it means a space is already allocated for it while creation we cannot increase it.

```
// writing to buffer
const buffer = new Buffer.from('Vishwas'); // here buffer is created with 6 slots
// buffer.write('code');
// console.log(buffer.toString()); // codewas (first 4 slots are replaced)

buffer.write('codevolution');
console.log(buffer.toString()); // codevol (as we have only 7 available slots while creation)
```

## lecture 25 Asynchronous JavaScript

![asynchronous javascript](./pictures/asynchronous_javascript.PNG)
![javascript blocking](./pictures/javascript_blocking.PNG)
![javascript single threaded](./pictures/javascript_singlethreaded.PNG)
![asynchronous javascript continued](./pictures/asynchronous_javascript_continued.PNG)

### Just JavaScript is not enough for asynchronous code

![webbrowser and nodejs for asynchronous](./pictures/webbrowser_and_nodejs_for_asynchronous.PNG)

## lecture 26 fs Module

The file system module (fs) allows you to work with the file system on your computer.

1. load the fs module.
2. after it is loaded we can than access the methods and properties of the module

### reading file contents

1. create a file `file.txt`
2. use the method `readFileSync` on `fs` module to read the contents of file synchronously. `readFileSync()` method accept path to the file. and returns data in `binary`

```
const fs = require('node:fs');
// reading file content synchronously.
const fileContents = fs.readFileSync('./file.txt');
// it gives the Buffer output in binary data
console.log(fileContents); // <Buffer 48 65 6c 6c 6f 20 43 6f 64 65 76 6f 6c 75 74 69 6f 6e>
```

3. to get the data in human readable format add a second argument `"utf-8"` which is the encoding.

```
// get data in human readable format add utf-8 encoding
const fs = require('node:fs');
// reading file content synchronously.
const fileContents = fs.readFileSync('./file.txt', 'utf-8');
console.log(fileContents); // Hello Codevolution
```

4. fs module internally uses the Buffer.
5. `readFileSync()` will read the data synchronously means that this method will block the `javaScript engine` main thread till it complete its operation than it will move to the next line of code down the line.
6. This behaviour is not good for that we use asynchronous mechanism
7. Node.js is asynchronous. it has features to do tasks asynchronously without blocking the main thread. for that reason another method exist to read the file contents asynchronously i.e `fs.readFile("./file.txt")`
8. The second argument is a callback function which will be invoked after the contents of file have been read.
9. This function receive 2 parameter `error` and `data`. This method of callback function is call `error first callback pattern`

```
// get data Asynchronously in binary format
const fs = require('node:fs');
// reading file content Asynchronously. error first callback pattern
fs.readFile('./file.txt', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data); // <Buffer 48 65 6c 6c 6f 20 43 6f 64 65 76 6f 6c 75 74 69 6f 6e>
  }
});
```

```
// get data Asynchronously in human readable format
const fs = require('node:fs');
// reading file content Asynchronously. error first callback pattern
fs.readFile('./file.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data); // Hello Codevolution
  }
});
```

10. to prove that the method `fs.readFile()` is working Asynchronously add some `console.log` statements

```
// To prove readFile method is Asynchronous
const fs = require('node:fs');
console.log('first');
const fileContent = fs.readFileSync('./file.txt', 'utf-8');
console.log(fileContent);
console.log('second');
fs.readFile('./file.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data); // Hello Codevolution
  }
});
console.log('third');

// output
// $ node index
// first
// Hello Codevolution
// second
// third
// Hello Codevolution
```

As you can see `third` is logged before. so what node does is keep track of callback function and allow to execute the other code

### writing contents to the file

1. <u>Synchronously</u>

- The method accept a `file name with its path` and the `content string` which needs to be written

```
// writing to the file synchronously
const fs = require('node:fs');
fs.writeFileSync('./greet.txt', 'Hello World');
```

- `greet.txt` file will be created and `Hello World` will be written in it.

2. <u>Asynchronously</u>

- The third argument will be a callback function.

```
// writing to the file Asynchronously
fs.writeFile('./greet.txt', 'Hello Vishwas!', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log('file written');
  }
});
```

- if we check the `greet.txt` file the old text `Hello World` will be overwritten by `Hello Vishwas!`. This is the default behaviour of `writeFile` method.
- however if we want to append the text we need to add a flag `{ flag: "a"}`

```
// appending the new string while writing to file
// writing to the file Asynchronously
fs.writeFile('./greet.txt', ' Hello Vishwas!', { flag: 'a' }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log('file written');
  }
});
```
