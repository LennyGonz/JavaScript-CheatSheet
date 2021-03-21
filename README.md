# Understanding JavaScript Concepts

## Execution Context - Thread of Execution - Global Memory - Call Stack

There are two halves to the process of executing code

1) the ability to walk through the code line-by-line → known as the thread of execution <br> All that is, is the ability to take line one → execute it, line two → execute it, and so on. <br> It's threading its way down our code (top → bottom) <br>
2) Simultaneously, the other part that's required to run our code is a place to store the bits of data that we announce as we go through our codes global execution context, which is the global memory.

So to reiterate,when Javascript code is run, the thread of execution reads each line of code. Line-by-line and when it reads each line it also saves everything in global memory:
  - function definitions
  - variables
  - etc...

And when it reads a line where a function is invoked, Javascript creates a `local execution` context that keeps track of the variables/constants used inside the function block known as `local memory`.
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

Multiple functions can be invoked, so how does Javascript keep track?

Using a call stack.

Always in the call stack is global, so when there are no more functions left on the call stack, it returns back to global.

In the example above, our call stack would push `multiplyBy2(num)` → create an execution context (return result) → pop `multiplyBy2(num)` off the stack 

Then push `multiplyBy2(10)` onto the call stack → create an execution context (return result) → pop `multiplyBy2(10)` off the stack and return to global

## Callbacks & Higher Order Functions

## Arrow Function

## Scope & this

## Asynchronous Javascript

## Closure

## Promises

## __proto__ & Prototype

## Classes
