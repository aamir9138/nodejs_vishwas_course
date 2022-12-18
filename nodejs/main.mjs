/* ES Modules lecture 16 */

// // in ES Modules we import as below
// import add from './math-esm.mjs';

// console.log(add(4, 3));

// // third pattern for multiple function import
// import math from './math-esm.mjs';

// console.log(math.add(5, 5));
// console.log(math.subtract(5, 5));

// // destructing the imports
// import math from './math-esm.mjs';

// const { add, subtract } = math;
// console.log(add(5, 5));
// console.log(subtract(5, 5));

// // fourth pattern of importing
// import * as math from './math-esm.mjs';

// const { add, subtract } = math;
// console.log(add(2, 4));
// console.log(subtract(6, 5));

// fifth pattern of importing
import { add, subtract } from './math-esm.mjs';
console.log(add(2, 4));
console.log(subtract(6, 5));
