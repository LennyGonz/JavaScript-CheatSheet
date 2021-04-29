let ender = (ending) => (input) => input + ending;

let adore = ender(" rocks");

let announce = ender(", y'all");

let exclaim1 = ender("!");

let hypeUp = (x) => exclaim1(announce(adore(x)));
hypeUp("JS"); // "JS rocks, y'all!"
hypeUp("FP"); // "FP rocks, y'all!"

import { curry, compose } from 'ramda';

const add = curry((x, y) => x + y);

const concat = curry((y, x) => x + y);

const toUpper = str => str.toUpperCase()

const exclaim = str => str + '!'

const first = xs => xs[0]

const log = curry((tag, x) => console.log(tag,x), x)

// By using ramda's compose we can pass in as many arguments as we want
// const compose = (f, g) => x => f(g(x))
// Compose takes two functions an `f` and a `g` and is defined as f of g of x
// All we're saying is, I take an f and I take a g and I'm going to next this function call

const shout = compose(exclaim, toUpper);
console.log(shout('lenster'));
// we're just nesting
// const compose = x => exclaim(toUpper('lenster'));
// Also note, we go right to left -> first g(x) then f(result of g(x))

const loud = compose(first, exclaim, toUpper);
console.log(loud("tears")) // T

const louder = compose(exclaim, toUpper, first)
console.log(louder('tears')) // T!

const loudFirst = compose(toUpper, first);

const conlog = compose(concat('!'), log('here:'), loudFirst);
