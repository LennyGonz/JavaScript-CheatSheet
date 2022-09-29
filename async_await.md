# Async/Await

## The Event Loop

The browser and node js are always running a single threated event loop to run your code

On the first go around -> it will run all your synchronous code **but**
it might also queue up asynchronous events to be called back later ...

so you say "here's a function that I need to run but i need to go get some data from the network event"
the event loop says "okay i'll keep doing my thing while you do your thing in a seperate thread pool"

Then at some point in the future `getData()` will finish and let the event loop know that it's ready to be called back...

If it's a macrotask like a `setTimeout()` it'll be executed on the next event loop
but if its a **micro**task like a `fulfilled promise` then it'll be called back **before** the start of the next event loop

Example:

```js
console.log("synchronous")

setTimeout(_ => console.log("timeout 2"), 0)

Promise.resolve().then(_ => console.log("Promise 3"))

console.log("synchronous 4")
```

We have 2 console log statements which are synchronous
a `setTimeout` which is a **macro**task
a `Promise` which is a **micro**task

If we run this code we see:

```bash
synchronous
synchronous 4
Promise 3
Timeout 2
```

So even those the setTimeout was queued up before the Promise
the promise gets executred first because of the priority of the microtask queue

## Promises

```js
// fetch is a browser based api - its avaiable through node -> it returns a promise
import fetch from "node-fetch"

// fetching data from a remote server is ALWAYS GOING TO BE A async action
// so we can queue up the promise THEN
// provide it with a callback to map it to JSON
const promise = fetch("http://jsonplaceholder.typicode.com")

// callback to map it to JSON
promise
  .then(res => res.json())
  // promises can be chained together
  // mapping to json is also a promise so we can return that promise from the original callback
  // then in the next one we'll have the actual user data as a plain JS object
  .then(user => console.log("hi"))
  // catch -> error handling
  .catch(err => console.error(err))

console.log("sync")
```

When you start creating promises - thats when you're most likely to screw things up

```js
// making our own promise

const tick = Date.now()
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}`)

// if we run this on the main thread it's going to block all of their
// executing until the 100 loops are done
const codeBlocker = () => {
  let i = 0;
  while (i < 100) {
    i++;
  }
  resolve("100 loops done")
}


console.log("sync 1")
codeBlocker().then(log)
console.log("sync 2")

// what we see is 
sync 1
Elapsed: 0ms

sync 2
Elapsed: 730 ms

"100 loops done"
Elapsed: 781 ms
```

We see that between the 2 synchronous code lines - theres a clear blockage 
So we'll refactor

```js
const tick = Date.now()
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}`)

const codeBlocker = () => {
  // By putting this code inside of a resolve promise 
  // we can be guaranteed that it will be executed 
  // after all the synchronous code in the current macrotask has completed
  return Promise.resolve.then
}

console.log("sync 1")
codeBlocker().then(log)
console.log("sync 2")

// what we see is 
sync 1
Elapsed: 0ms

sync 2
Elapsed: 4 ms

"100 loops done"
Elapsed: 719 ms
```

## Async Await Explained

The problem with promises is they can get very long because of chaining
So async/await is syntactic sugar to make your asyncronous code read like synchronous code

We're gonna first focus on async

```js
const getFruit = async() => {
  // this a regular function that does nothing
  // if we put the async keyword in front of it
  // we have a function that returns a promise of nothing
}

// so whatever gets returned inside that function will be a promise of that value

export const getFruit = async name => {
  const fruits = {
    pineapple: '🍍',
    peach: '🍑',
    strawberry: '🍓'
  };

  return fruits[name];
};

getFruit('peach').then(console.log);
```

If we use the async keyword - the magic that happens is that it takes the return value 
and automatically resolves it as a promise AND

it sets up context for you to use the **await** keyword

the real power async function comes from when you combine it with the `await` keyword to 
pause the execution of the function

> If we didnt have async we would just return a promise that resolves to the specifed value. Like this:
> ```js
> const getFruit() = (name) => {
>     const fruits = {
>       pineapple: '🍍',
>       peach: '🍑',
>       strawberry: '🍓'
>   };
>   return Promise.resolve(fruits[name]);
> }
> ```

```js
// Async + Await

export const makeSmoothie = async () => {
  const a = await getFruit('pineapple');
  const b = await getFruit('strawberry');

  return [a, b];
};
```

Our second async function `makeSmoothie`, we're going to get multiple fruits then combine them together as a single value 
Instead of chaining a bunch of `.then()` callbacks we can just have a promise resolve to the value of variable
`Await` is like saying "pause the execution of this function until the `getFruit` promise results to a value
  at which point we can use it as the variable `a`

`makeSmoothie` without `async/await` would look like this:

```js
const makeSmoothie2 = () => {
  let a;
  return getFruit('pineapple')
    .then(v => {
      a = v;
      return getFruit('strawberry');
    })
    .then(v => [a, v]);
};
```

We're waiting for a pineapple to resolve and then we're getting a strawberry afterwards 
But we could get both of the fruits at the same time
> you only need to await one thing after another **IF** the second value is dependent on the first value
For example if you need to get a user ID before you can retrieve some data on that user


```js
// Async + Await

export const makeSmoothie = async () => {
  const a = await getFruit('pineapple');
  const b = await getFruit('strawberry');
  const smoothie = Promise.all([a, b]);

  return smoothie;
};
```

We know that a async function always returns a promise so instead of doing one after the other
we can add both of our promises to `Promise.all`

this will tell all the promises in the array to run concurrently and then have the resolved value be at that index in the array
Try not to pause a function unnecessarily

So instead of awaiting a bunch of individual promises ... you might want to add all your promises to an array
and then await that promise all call.

It's also great for error handling

```js
const badSmoothie = async() => {
    try {
        const a = getFruit('pineapple')
        const b = getFruit('strawberry');
        const smoothie = await Promise.all([a, b])

        throw 'broken!'

        return smoothie;

    } catch(err) {
        console.log(err)
        // return `😬 We are going to be fine...`
        throw `💩 It's broken!`
    }
}
```

You can use the await keyword directly inside a for-loop

If you have a promise that you know ressolved to an array
you can use the await keyword directly in the loop

```js
const fruitLoop = async() => {
  for await(const emoji of smoothie) {
    console.log(emoji)
  }
}
```

same can be done with an if-statement

`if (await getFruit('peach') === '🍑')`
