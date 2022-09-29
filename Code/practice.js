// const firstPromise = new Promise((res, rej) => {
//   setTimeout(res, 500, 'one')
// })

// const secondPromise = new Promise((res, rej) => {
//   setTimeout(rej, 100, 'two')
// })

// Promise.race([firstPromise, secondPromise]).then(res => console.log(res))

// async function getData() {
//   return await Promise.resolve('I made it!');
// }

// const data = getData();
// console.log(data);

// const myPromise = () => Promise.resolve('I have resolved!')

// function firstFunction() {
//   myPromise().then(res => console.log(res))
//   console.log('second')
// }

// async function secondFunction() {
//   console.log(await myPromise());
//   console.log('second')
// }

// firstFunction();
// secondFunction();

// var snack = 'Meow Mix';

// function getFood(food) {
//     if (food) {
//         var snack = 'Friskies';
//         return snack;
//     }
//     return snack;
// }

// console.log(getFood(false)); // 'Meow Mix'

// {
//     let food = 'mexican'
//     console.log(food)
// }
// console.log(food)

function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log(this.name + " says woof");
};

let fido = new Dog("fido");
fido.bark();

var d = {};

["zebra", "horse"].forEach(function (k) {
  d[k] = undefined;
});

console.log(d);

var arr1 = "john".split("");
console.log("arr1 " + arr1);

var arr2 = arr1.reverse();
var arr3 = "jones".split("");
arr2.push(arr3);

console.log("array2: " + arr2 + " || " + "arr1 " + arr1);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

console.log(1 + "2" + "2");

class Whatever {
  someMethod = () => {
    // Always the instance of Whatever:
    console.log("this:" + this);
  };
}

const test = new Whatever();
test.someMethod();

function someFunction() {
  return this;
}

const boundObject = { hello: "world" };
const boundFunction = someFunction.bind(boundObject);

// Logs `false`:
console.log(someFunction() === boundObject);
// Logs `true`:
console.log(boundFunction() === boundObject);
