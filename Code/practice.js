// const firstPromise = new Promise((res, rej) => {
//   setTimeout(res, 500, 'one')
// })

// const secondPromise = new Promise((res, rej) => {
//   setTimeout(rej, 100, 'two')
// })

// Promise.race([firstPromise, secondPromise]).then(res => console.log(res))

async function getData() {
  return await Promise.resolve('I made it!');
}

const data = getData();
console.log(data);
