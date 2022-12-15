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
