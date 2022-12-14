/* IIFE functions */
// (function () {
//   const superHero = 'Superman';
//   console.log(superHero);
// })();
// (function () {
//   const superHero = 'Batman';
//   console.log(superHero);
// })();

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
