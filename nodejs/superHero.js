class SuperHero {
  constructor(name) {
    this.name = name;
  }
  // const getName() --- a class member cannot have a const keyword
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}
// module.exports = new SuperHero('Batman'); // exporting the instance of class
module.exports = SuperHero; // exporting the class. see the altered index.js code also for this
