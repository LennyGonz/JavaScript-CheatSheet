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

{
    let food = 'mexican'
    console.log(food)
}
console.log(food)
