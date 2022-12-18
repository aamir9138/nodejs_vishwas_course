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
- Node.js runtime unlike the browser runtime doesnot has access to the web apis. there is no window or document object when working with Node.js
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

### Module Caching

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

### Import and Export patterns in projects

we will describe a number of patterns used projects code bases online for Import and export

1. for single function export and import

```
// for single import
const add = require('./math');
console.log(add(7, 7));

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

### module.exports vs exports reasoning

1. create object-reference.js file
2. write this code in the file and run node object-reference.js
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

## CommonJS last comments

1. Each file is treated as a module
2. Variables, functions, classes, etc. are not accessible to other files by default
3. Explicitly tell the module system which parts of your code should be exported via `module.exports` or `exports`
4. To import code into a file, use the require() function.

---

## ES Modules

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
5. The export can be default or named
6. We import the exported variables or functions using the import keyword
7. if it is a default export, we can assign any name while importing
8. if it is a named export, the import name must be the same
