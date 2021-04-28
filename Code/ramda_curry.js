import { curry } from 'ramda';

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
)

const replaceVowels = replace(/[AEIOU]/ig, '!')

const result = replaceVowels("Hey I Have Vowels")
console.log(result) // H!y ! H!v! V!w!ls

// =================================================================== //
// Setup
//==============
const _ = R; // Brian imported ramda here
const split = _.curry((delimiter, string) => string.split(delimiter))


// Exercise 1 
//==============

const words = split(" ")
// split takes 1 argument at a time, string last
// One way to look at it is: const words = (str) => split('', str)
// But you can cancel out the arguments (str) and the str inside of split
// But if I call split like this: split(" ") with its argument, words is now a function that takes a string
/*
Originally this
const words = function(str) {
  return split(' ', str);
}
*/

QUnit.test("Ex1: split", assert => {
  assert.deepEqual(words("Jingle bells Batman smells"), ['Jingle', 'bells', 'Batman', 'smells'])
})


// Exercise 1a
//==============
//use map to make a new words fn that not only works on 1 string, but on an array of strings.

// const sentences = xs => _.map(words, xs);
// just like in the first example we can cross out the same arguments
// and just say:
const sentences = _.map(words)

QUnit.test("Ex1a: map/split", assert => {
  assert.deepEqual(sentences(["Jingle bells Batman smells", "Robin laid an egg"]), [['Jingle', 'bells', 'Batman', 'smells'], ['Robin', 'laid', 'an', 'egg']]);
})


// Exercise 2
//==============
/*
const filterQs = function(xs) {
  return _.filter(function(x){ return _.test(/q/ig, x);  }, xs);
}
*/
// Again here we can cancel out arguments - first xs
//const filterQs = _.filter(function(x){return _.test(/q/ig, x); })

// We can take it a step further and cancel out the `x` argument
const filterQs = _.filter(_.test(/q/ig))

QUnit.test("Ex2: filter", assert => {
  assert.deepEqual(filterQs(['quick', 'camels', 'quarry', 'over', 'quails']), ['quick', 'quarry', 'quails']);
})


// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max

const _keepHighest = (x,y) => x >= y ? x : y // <- leave be

// TODO: rewrite max in its "simplest" form
/*
const max = function(xs) {
  return _.reduce(function(acc, x){
    return _keepHighest(acc, x);
  }, 0, xs);
}
*/
// const max =  _.reduce(_keepHighest, 0);
// Well a function that takes an accumulator and an x
// but keepHighest is already a function that takes that same accumulator and an x
// Why am I putting in a function and just threading in the same arguments through?? So we can remove the entire inner function
// Reduce will pass its accumulator (_keepHighest) and value (0) into _keepHighest
// _.reduce((acc, x) => _keepHighest(acc, x), 0, xs); -> this is unnecessary, we can get rid of that noise by passing a first-class function
// Then again remove the same argument: xs
const max =  _.reduce(_keepHighest, 0);

QUnit.test("Ex3: max", assert => {
  assert.equal(max([323,523,554,123,5234]), 5234);
})


// Bonus 1:
// ============
// wrap array's built in slice to be functional and curried like ramda fn's.
// //[1,2,3].slice(0, 2)

const slice =  _.curry((start, end, xs) => xs.slice(start, end))

QUnit.test("Bonus 1", assert => {
  assert.deepEqual(slice(1)(3)(['a', 'b', 'c']), ['b', 'c']);
})

// Bonus 2:
// ============
// use slice to define a function take() that takes n elements from an array. make it curried
const take = slice(0)
// remember slice takes 3 arguments - currying is waiting for each argument
// slice(start) -> slice(start,end) -> slice(start, end, xs)
// slice(0) (becauuse we're taking the first n elements) -> slice(0, 2) (2 is passed in our testcase)
// slice(0,2,['a','b','c']), which will lead to ['a','b''c].slice(0,2) = ['a','b']

QUnit.test("Bonus 2", assert => {
  assert.deepEqual(take(2)(['a', 'b', 'c']), ['a', 'b']);
})
