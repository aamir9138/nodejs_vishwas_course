// /* lecture 22 Extending from EventEmitter */
// // creating a simple class
// class PizzaShop {
//   constructor() {
//     this.orderNumber = 0;
//   }

//   order() {
//     this.orderNumber++;
//   }
//   displayOrderNumber() {
//     console.log(`Current order number is : ${this.orderNumber}`);
//   }
// }
// // export the class
// module.exports = PizzaShop;

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
