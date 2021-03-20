# Understanding JavaScript Concepts

## Thread of Execution

When Javascript code is run, the thread of execution reads each line of code. Line-by-line and when it reads each line it also saves everything in global memory:
  - function definitions
  - variables
  - etc...

```js
const num = 3;
function multiplyByTwo(inputNumber){
  const result = inputNumber * 2;
  return result;
}

const output = multiplyByTwo(num);

const newOutput = multiplyByTwo(10);
```

<p align="center">

<image src="/Images/ExecutionContext.png">

</p>

> When we execute `multiplyByTwo(10)` Javascript creates a execution context
> Inside we run the code of a function and keep track of the variables inside the function definition using Local Memory
>
> Engine: Line one. There’s a variable! Cool. Let’s store it in the Global Memory.
>
> Engine: Line two. I see a function declaration. Cool. Let’s store that in the Global Memory too!
>
> Engine: Line 3. Declare a variable and the output is the return value of the execution of multiplyByTwo(num)
>
> Engine: Line 4. Declare a variable and the output is the return value of the execution of multiplyByTwo(10)
>
> Engine: Looks like I’m done.

## Global Memory

## Call Stack

## Scope & this

## Arrow Function

## Asynchronous Javascript

## Closure

## Promises

## __proto__ & Prototype

## Classes
