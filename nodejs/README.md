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
- visit v8.dev for details

---

### JavaScript Runtime

JavaScript runtime is an environment which provides all the necessary components in order to use and run a JavaScript program

- A JavaScript Engine is one component in the JavaScript Runtime
- JavaScript Runtime has other modules in addition to the JavaScript Engine
- Node.js can run the JavaScript program outside the browser

github.com/nodejs/node ---- this repo contains code for JavaScript runtime
node/deps/ ------------ contain dependencies
uv(libuv) and v8 are the major dependencies present in deps folder
src ------- contains code of nodejs in C++
lib ------- this folder contains the JS code which access the C++ feature for example fs.js (to access file system)

### Few words about Node.js

- Node.js is not a language, it is not a framework
- Node.js runtime unlike the browser runtime doesnot has access to the web apis. there is no window or document object when working with Node.js

nodejsfile>.vscode>settings.json>{"window.zoomLevel:2"}

node -v

node REPL:
Read
Evaluate
Print
Loop

node

> console.log("hello world")
> 2+2

=> writing JavaScript code in a file:
node index.js

with Nodejs we cannot interact with DOM, or other Web Platform Apis like Cookies. we don't have the document, window and all the other objects that are provided by the browser.

with browser we don't have all the nice APIs that Nodejs provides through its modules. for example filesystem access functionality

with Nodejs you control the envirnment
with browser you are the mercy of user choice

---

### Modules

- A module is an encapsulated and reusable chunk of code that has its own context
- In node.js, each file is treated as a separate module

### Types of Modules

    1. Local Modules - Modules that we create in our application
    2. Built-in Modulues - Modules that Node.js ships with out of the box
    3. Third party Modules - Modules written by other developers that we can use in our application
