function greet(greeting, name){
  return `${greeting}, ${name}`
}

function curryGreet(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`
  }
};

const greetItal = curryGreet("Ciao");
greetItal("Alonzo"); // "Ciao, Alonzo"

const greetTex = curryGreet("Howdy");
greetTex("Alonzo"); // "Howdy, Alonzo"
greetTex("Alan"); // "Howdy, Alan"


const add = (x, y) => console.log(x + y)

const curry = f =>
  x => y => f(x, y)
  
const curriedAdd = curry(add)
console.log("curriedAdd " + curriedAdd)

const increment = curriedAdd(1)

const result = increment(4)

console.log(result);

const modulo = curry((x,y) => y % 2)

const isOdd = modulo(2)

const result2 = isOdd(2)

console.log(result2);


const filter = curry((f, xs) => xs.filter(f))
// what's gonna happen here is filter will run through the array and
// call our function on every value.

const getOdds = filter(isOdd)
const result3 = getOdds([1, 2, 3, 4, 5])

console.log(result3)
