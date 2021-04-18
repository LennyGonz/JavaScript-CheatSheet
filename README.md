<div align="center"> <h1>Understanding JavaScript</h1></div>

## 1. Execution Context - Thread of Execution - Global Memory - Call Stack

There are two halves to the process of executing code

1) the ability to walk through the code line-by-line → known as the thread of execution <br> All that is, is the ability to take line one → execute it, line two → execute it, and so on. <br> It's threading its way down our code (top → bottom) <br>
2) Simultaneously, the other part that's required to run our code is a place to store the bits of data that we announce as we go through our codes global execution context, which is the global memory.

So to reiterate,when Javascript code is run, the thread of execution reads each line of code. Line-by-line and when it reads each line it also saves everything in global memory:
  - function definitions
  - variables
  - etc...

And when it reads a line where a function is invoked, Javascript creates a `local execution` context that keeps track of the variables/constants used inside the function block known as `local memory`.

<p align="center">

<image src="/Images/js_snippet04.png">

</p>

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

## 2. Variables

ES6 introduced 2 additional keywords to declare a variable:

- let
- const

> `const` variables cannot be reassigned, while `let` and `var` can
> 
> `let` provides a solution to the scoping issue seen with `var`
> 
> Both `let` and `const` are block scoped, whereas `var`s scope is confined to the function in which it's defined
> 
> **And** unlike `var`, `let` and `const` statements are not hoisted to the top of their enclosing scope

## 2.1 block scoping with let

An example using `var`:

```js
function start() {
  for(var i = 0; i < 5; i++){
    console.log(i)
  }
  console.log(i) // 5
}
```

You'd expect the second `console.log(i)` to throw a reference error, but `var`s scope is confined to `start()`

```js
function start() {
  for(let i = 0; i < 5; i++){
    console.log(i)
  }
  console.log(i) // this will throw a reference error
  // because outside the for-loop i does not exist
}
```

This behavior is more expected, `i` is confined to the for-block. So attempting to see its value outside will throw a reference error
`let` is great for using inside of blocks - if we were to swap `let` with `var` the error would go away
Because `i` becomes accessible outside the scope, and we can display the current value of i.

> Referencing block-scoped identifiers before they are defined will produce a `ReferenceError`

## 3. Functions

### 3.1 Function Declarations and Function Expressions

Function declarations vs Function expressions

```js
function teacher() { / ... / }
// function declaration

const nameImprover = function(name, adj){
  return 'Col' + name + ' Mc' + adji + ' pants'
}
// This is an anonymous function expression

const nameImprover = function nameImprover(name, adj){
  return 'Col' + name + ' Mc' + adji + ' pants'
}
// named function expression
```

> It's a stylistic choice based on scope !

```js
function teacher() { / ... / }

const myTeacher = function anotherTeacher(){
  console.log(anotherTeacher)
}
```

> The last console log - will throw a ReferenceError, because there is no `anotherTeacher()` in global scope therefore global scope will never had heard of this function


**One of the key differences** between *function declarations* and *function expressions* is:

- that function declarations attach their name to the enclosing scope
- whereas function expressions put their identifier into their own scope.

### 3.2 Named function expressions

A function expression thats been given a name.

```js
var clickHandler = function() {
  // ...
}

var keyHandler = function keyHandler(){
  // ...
}
```

`clickHandler()`, I'm declaring a function expression:
- why is it a function expression?
  - because its not a function declaration...
    - How do we know if somethings a function declaration? 
      - if the word function is literally the first thing in the statement

So if `function` is not the first thing in the statement, if there's a variable or an operator or parenthesis, then it's not a declaration... **it is an expression** <br>
**BUT also,** we see no name, so it's an anonymous function expression

whereas `keyHandler()` is a named function expression.

Setting aside the syntax differences between the anonymous function expressions and named function expressions <br>
Even though anonymous function expressions are vastly more common/popular, they make debugging code much harder <br>
Using **named function expressions** should be used more often because:

1. The name produces or creates a reliable self reference to the function from inside of itself 
   - that's useful if the function is recursive
   - if the function is an event handler and it needs to reference itself to **unbind itself**
   - its useful if you need to access any properties on that function object (i.e name, length, etc)
   - Any time you need a self reference to the function, the single only right answer to that question is, it needs to have a name.
2. More debuggable stack traces, in the stack traces you'll get `Anonymous Function` in the stack traces <br> but if you used a named function expression then you know exactly where your code is failing, or whats getting called or not getting called
3. More self-documenting code - we have to read the function body of an anonymous function and where its being called to **infer** what that function is doing... <br> Where as with function declarations the purpose of the function is in the name

### 3.3 IIFEs (another form of anonymous function expressions)

Immediatelly Invoked Function Expressions

1. Immediately Invoked - runs immediately
2. Function - a typical anonymous javascript function
3. Expression - a javascript expression is a piece of code that simply evaluates to a value

```js
var teacher = 'Will'

(function anotherTeacher(){
  var teacher = 'Lenny'
  console.log(teacher)
})();

console.log(teacher)
```

You'll notice that from the beginning of the declaration of `anotherTeacher()` there's a wrapping set of parenthesis around that function
That's what makes it a function expression, instead of a function declaration.

And then at the end of the function definition, you can see an extra set of parenthesis, which means it's getting invoked. Hence the 'immediately ivoked' part of the name

The main end result of an IIFE is we get a new block of scope, there's a block of scope inside of that function `anotherTeacher()`

> One of the well-known uses of IIFEs is avoiding global scope pollution
> Local variables declared using `var` keyword are scoped to the closest containing function
> And if there is no fnuction that exists, the variables will be global and would pollute the global scope
> To avoid this we simply wrap the `var` variables in an IIFE such that they are scoped within and isolated from global 

**However,** after the introduction `let` and `const`, this use case lost its popularity

**another usecase is Closures and Private Data**, IIFEs enable you to create closures that can maintain private Data

```js
const uniqueId = (function(){
  let count = 0;
  return function(){
    ++count;
    return `id_${count}`;
  };
})();

console.log(uniqueId()); // "id_1"
console.log(uniqueId()); // "id_2"
console.log(uniqueId()); // "id_3"
```

> By wrapping a local variable and have it accessed by a function that will be returned by the IIFE. 
> This implementation provides a closure that enables the function to access the local variable even when that function function is executed **outside** of the IIFE's lexical scope
> And the `count` variable cannot be accessed or modified from outside the scope making it **truly** private.
> The only way to access the variable is through the function being returned by the IIFE

**another usecase is enabling the Await keyword outside of Asnyc Functions**

If you use the `await` keyword outside of an `async` function, you'll get a Syntax Error
So as a workwround is to use async IIFEs, but handling the errors within is tricky

```js
(async() => {
  await Promise.resolve("resolved");
})();

// Uncaught Errors
(async() => {
  await Promise.reject("rejected");
})();

// Catching errors

// Method 1
(async () => {
  try {
    await Promise.reject("rejected");
  } catch(err) {
    console.log(err)
  }
})();

// Method 2
(async() => {
  await Promise.reject("rejected");
})().catch(err => {
  console.log(err);
});
```

The top level await proposal would remove the need for async IIFEs coupled with `await` keywords <br>
However, [top-level awaits](https://blog.bitsrc.io/why-should-you-use-top-level-await-in-javascript-a3ba8139ef23#:~:text=Top%2Dlevel%20await%20allows%20us,promises%20are%20resolved%20in%20middleware.) still have their problems


### 3.4 Arrow functions (another form of anonymous function expressions)

```js
function myFunc() {
  this.myVar = 0
  var that = this; // that = this trick
  setTimeout(
    function () { // A new *this* is created in this function scope
      that.myVar++;
      console.log(that.myVar) // 1
      
      console.log(this.myVar) // undefined 
    }, 0);
}

function myFunc() {
  this.myVar = 0;
  setTimeout(
    () => { // this is taken from surrounding, meaning myFunc here
      this.myVar++;
      console.log(this.myVar) // 1
    }, 0);
}
```

Syntax differences:
We don't have to wrap our parameters in parenthesis if there's only 1 parameters
If the function body is only 1 line - we don't need to wrap it in curly braces

It binds the context, and the context is the value that 'this' has ... to its parent context

All functions have a keyword 'this' that gets bound at call time...

Arrow functions do not have their own value for `this`
They inherit, they reach up to the parent scope and grab that value of `this` in that parent scope

And this functionality of arrow functions replaces the need to use `.bind()` or `var that = this -> that = randomObj`

Another thing is that arrow functions don't have its own value for the arguments keyword
So the arguments keyword, at call time, gets bound to all the arguments that are being passed to the function

The arguments keyword is the same as the arguments that are being passed, except it's an object-like-array
That comes for free in all of our regular functions in JS, but not arrow functions

Automatic returns in arrow functions can be tricky, its always better to explicitly write a return statement inside your arrow function


```js
var ids = people.map(person => person.id);

var ids = people.map(function getId(person){
  return person.id;
})
```

The arrow functions purpose (while obvious) the reader still has to **infer** the purpose of the function
Whereas the second one we know it gets an ID, we could even call it `getPersonID()` to be more descriptive

**You should definitely not be using arrow functions for general replacements for all other functions** !

One of the main reasons you should use arrow functions comes from it's **lexical `this` capabilities**

Another is: **Promise-chains**

```js
getPerson()
.then(person => getData(person.id))
.then(renderData)

getPerson()
.then(function getDataFrom(person){
  return getData(person.id)
})
.then(renderData)
```

And while you can do Named (Arrow) Function Expressions...
Its more characters to define the function as an arrow function then it is to make it a function declaration
```js
var getID = person => person.id;
var ids = people.map(getID)

// ****************************

var getDataFrom = person => getData(person.id);
getPerson()
.then(getDataFrom)
.then(renderData);
```

Personally I believe this is the heirarchy of function types that should be used:

1. Function Declarations
2. Named Function Expressions
3. Anonymous Function Expressions

### Arrow-functions and `this`

<p align="center">

<image src="/Images/js_snippet13.png">

</p>

Here `this` is correctly pointing to the workshop object
**How is this not implicit binding???????**
The behavior is actually called "lexical `this` behavior

Lexical `this`: many people think that an arrow function is essentially a hardbound function to the parent's `this` ... this is not accurate
The proper way to think of what an arrow function is... **an arrow function does not define the `this` keyword at all**
there is no such thing as a `this` keyword in an arrow function, which means **IF** you put a `this` keyword inside an arrow function it's going to behave **like any other variable**
Which means it's going to lexically resolve to some enclosing scope - that does define a `this` keyword

In the example above, when we say `this.` ... there is no `this` in that arrow function **NO MATTER HOW IT GETS INVOKED**
So we lexically go up one level of scope which is, the `ask()` function...
`this` goes out from the `callback` function (the  arrow function) that scope ---> to the enclosing scope, which is??? `ask()`
AND `ask()`'s definition of the `this` keyword is **determined by HOW IT IS INVOKED**...
`workshop.ask("Is this lexical `this`?");` ... `ask()` is being invoked by the workshop object... so `this` inside the arrow function determines what is pointing to by how `ask()` gets invoked.

So it resolves lexically, meaning if you had 5 nested arrow function it will go up 5 levels and keeps on going until it finds a function that defines a `this` keyword and whatever the `this` keyword points at for that function, that's what it uses.

The **spec sheet** for Arrow function says:

1. An arrow function does not defined local bindings for `arguments`, `super`, `this` or `new.target`. **Any reference to `arguments`, `super`, `this` or `new.target` within an arrow function must resolve to a binding in a lexically enclosing environment**
2. If you call `new` on an arrow function, you get an exception ... an error


<p align="center">

<image src="/Images/js_snippet14.png">

</p>

We tend to think that `{}` curly braces are scopes, theyre blocks, theyre function bodies ... they must be scopes!
**No!** 
In this example, when `this` goes up one level to resolve what `this` is pointing to... it won't point to the workshop object! just because it has curly braces doesn't mean its a scope! **Objects are not scopes!!!**, **Object properties aren't scoped, properties arent lexical identifiers**

**You have to think about an arrow function as not having a `this` and resolving it lexically!** 
So what is the parents scope!? There are only 2 scopes in the function above!
1) ask() - but its an arrow function
2) global scope 
Thats it! so `this` points to the global scope, and will therefore return `undefined`

**Nonetheless,** this arrow function lexical `this` behavior is a much better way of doing it rather than `var self = this` or even doing `function.bind()`
Because when you use it, you want the `this` to behave lexically, we don't want the arrow function to have some magical `this` behavior to it.
We want it to just adopt the `this` keyword of some parent scope.

Cannot stress this enough: **Only use `=>` arrow functions when you need lexical `this`**


```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher
  }
  ask(question) {
    console.log(this.teacher, question)
  }
}

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Lenny");
```

you can extend

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher
  }
  ask(question) {
    console.log(this.teacher, question)
  }
}

class AnotherWorkshop extends Workshop{
  speakUp(msg){
    this.ask(msg)
  }
}

var JSRecentParts = new AnotherWorkshop("Will")

JSRecentParts.speakUp("Are classes getting better");
// Will Are classes getting better
```

As a matter of fact, the class system also now has a `super` keyword in it:

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher
  }
  ask(question) {
    console.log(this.teacher, question)
  }
}

class AnotherWorkshop extends Workshop{
  ask(msg) {
    super.ask(msg.toUpperCase())
  }
}

var JSRecentParts = new AnotherWorkshop("Will")

JSRecentParts.speakUp("Are classes Super?");
// Will Are classes super?
```

`super` allows you to do relative polymorphism
If you have a child class that defines a method of the same name as a parent class, so called shadowing,
if you have one that defines the same method name in a chold as in the parent.

You can refer to the parent from the child by saying `super.` --> in our example we did `super.ask(msg.UpperCase())`


### 3.5 Callbacks & Higher Order Functions

Functions in JavaScript are first class objects, meaning they can co-exists with and can be treated like any other JS object

1. Assigned to variables and properties of other objects
2. Passed as arguments into functions
3. Returned as values from functions

```js
function copyArrayAndManipulate(array, instructions){
  const output = []
  for(let i=0; i < array.length; i++){
    output.push(instructions(array[i]))
  }
  return output
}
```
*otherwise known as `map()`*

Which is our higher order function?
- The outer function that **takes in** a function is our higher order funcion
- In this case our higher order function is: `copyArrayAndManipulate()`

Which is our callback function?
- The function **we insert** is our callback function
- In this case our callback function is `multiplyBy2()`

**The notion of passing in a function to the running of another function in a very different way is going to turn out to be the backbone of asynchronous JavaScript**. Even if we're using promises, even if we're using async/await... behind the scenes - passing in a function to another function is going to be the core of those concepts

## 4. Scope & this

Scope: where to look for things

Function Scoping

```js
var teacher = "Lenny"

console.log(teacher)
```

```js
var teacher = "Lenny"

var teacher = "Suzy";
console.log(teacher); // Suzy

console.log(teacher) // Suzy 
```

How do we solve the problem of having 2 of the same variable names?

```js
var teacher = 'Will'

function anotherTeacher() {
  var teacher = 'Suzy'
  console.log(teacher) // Suzy
}

anotherTeacher();

console.log(teacher) // Will
```



### 4.1 Lexical Scope

### 4.2 Dynamic Scope

Dynamic Scope **does not exist in JavaScript!**

Add image from slides

### 4.3 Block Scoping

Anything within `{}` is a block

```js
function blockScope(){
  const x = 5;
  if (true) {
    let x = 25;
    // console.log(x) -> 25
  }
  console.log(x) // 5
}
```
This shows the block scoping capabilities of `const` and `let`
`let` is confined to the scope of the if-statement
`const` is 1 layer up

however, if you switch the `let` to a `var` it will throw a reference error

```js
var teacher = 'kyle'

function otherClass() {
  teacher = 'Suzy'
  topic = 'react'
  console.log("Welcome")
}

otherClass(); // Welcome

teacher; // Suzy
topic; // React -> this variable wasn't defined anywhere so JS 
// goes ahead and makes it in the global scope (this is while JS is in "sloppy-mode" not strict-mode)
```

undefined vs undeclared

undefined is a variable that has been declared, but it doesn't have a value
undeclared is one that was never declared anywhere, and JS has no idea where it is

A function's `this` references the execution context for that call, determined **entirely** by **how the function was called**
It's not about the definition of the function, it's not where the function is, it's not what the function belongs to, **none of that matters**
It's only how the function was called that determines what the `this` keyword is pointing at.

```js
var workshop = {
  teacher: 'kyle',
  ask(question) {
    console.log(this.teacher, quuestion)
  },
}

workshop.ask("what is implicit binding")
```

To determine what the `this` keyword is going to point at, we don't need to look at the function block. We need to look at the function invocation!
**Implicit binding rule**, it means at the place where the function was called (workshop.ask("what is implicit binding")) - you'll notice that there is a `workshop` object in front of the reference to the `.ask()` method. That's an implicit binding of the workshop as the `this` keyword.

So on the line that uses the `this` keyword - that **particular** invocation of the function, is going to point at workshop, which is why when it says `this.teacher`, it's gonna end up pulling out the name kyle. Instead of `undefined` or some other value.

So it was entirely based upon this line: `workshop.ask("what is implicit binding")`, it was not that `ask()` was inside of `workshop` object, it was **just the way we called on the last line, allowed that function ask to use `workshop` as its `this` context**

We can actually change, we can have a function that is in one place, and change what `this` context it uses, based upon its call site.

```js
function ask(question){
  console.log(this.teacher, question)
}

function otherClass(){
  var myContext = {
    teacher: 'suzy'
  }
  ask.call(myContext, "why?") // Suzy why?
}

otherClass();
```

I have a function `ask()` that is `this` aware (meaning it uses the keyword `this`)
It doesn't have any object that its wrapped around, there's no obvious `this` context for it to adopt, and that's because the `this` context is going to be entirely determined by how well call it.
And we call it inside the function `otherClass()` and that's going to determine what the `this` keyword is going to point at

Also inside the `otherClass()` function we make an object called `myContext`, with the teacher of value 'Suzy'
And then after we invoke the `ask()` function using `.call()` - which is another way of invoking a function that tells it, invoke that function `ask()` and use the `myContext` object as the `this` keyword.

So when it says `this.teacher` its going to find `myContext` as that value and its going to pull out teacher with the value `Suzy`

So teacher then points at the teacher that we defined in the `myContext` object

Importantly, when we say `.call` on a method, instead of saying `workshop.ask()` or `myContext.ask()`, here we just said `ask.call` and we gave it an object to use for the `this` keyword
That is called an **explicit binding**.

In both cases, we're providing a dynamic context to this function, and if we were to do so in five different other places of the program, we could end up getting each one of those invocations using a **different** `this` keyword

It can be 1 function that can be reused against a lot of different contexts

`this`

A function's `this` references the execution context for that call, a context in which that call was being made and that is detemined entirely by **how the function was called**

In other words, if you look at a function that has a `this` keyword in it. It is assigned based upon how the function is called
Which is the counterintuitive part because most people think that you could look at a function, and figure out what its `this` keyword is going to point at.
**But the function's definition doesn't matter at all**, when determing the `this` keyword
**The only thing that matters is:** how does that function get invoked?


A `this`-aware function can thus have a different context each time its called, which makes it more flexible and reusable
In other words the `this` keyword is Javascripts version of dynamic scoping - **because what matters is how the function is being called**

<p align="center">

<image src="/Images/js_snippet06.png">

</p>

So instead of asking teacher to get the teacher, on line 4, when it references teacher, instead of trying to go to line 1 to get teacher, it goes to line 8
**thats how it works in a dynamically scoped language**, which JS is not

In JS to mimic this behavior we can use `this`

```js
function aks(question){
  console.log(this.teacher, question)
}

function otherClass() {
  var myContext = {
    teacher: "Suzy"
  }

  ask.call(myContext, "Why?")
}

otherClass();
```

You'll notice we're invoking `ask()` from another location, but it doesn't matter...
**It's not where I call it from, it's how I call it** 
By using `call()` I'm saying use this particular object (myContext) as your `this` keyword, and invoke the function in that context
So the `this` keyword in this particular case, will end up pointing at my context.

So you get that dynamically flexibilty.
We can call that same `ask()` function, lots of different ways... and provide lots of different context objects for the `this` keyword to point at, thats the dynamic flexible reusability of the `this` keyword. 

Thats why `this` exists, so we can invoke functions in these different contexts

if you were to do `ask("Why?")` instead you'll get -> "undefined why?"


There are 4 different ways of invoking a function, and each way is going to answer: "what is the `this` keyword?" differently

In lexical scope land, we start at the current scope and we work our way to the global scope

1) this: implicit binding

<p align="center">

<image src="/Images/js_snippet07.png">

</p>

You'll notice i have a workshop objec with a method on it that is `this` aware.
That's called the `namespace pattern`

how does the `this` keyword behave in the namespace pattern?

When we invoke the `ask()` method on the workshop objecy, how does it figure out what the `this` keyword should point at?
> The Call Site
> Because of the call site the `this` keyword is going to end up pointing at the object that is used to invoke it, which in this case is the workshop object
> `workshop.ask()` says invoke `ask()` with the `this` keyword pointing at workshop - thats what the implicit binding rule says
> And thats how the `this` keyword works in all other languages - so this is the most common and intuitive 

2) this: dynamic binding -> sharing

<p align="center">

<image src="/Images/js_snippet08.png">

</p>
Im sharing the ask function across 2 different objects: workshop1 and workshop2
With the help of the implicit binding rule, `this` points to the object - so its invoked in 2 different contexts (again to the dynamic flexibility)

3) this: explicit binding

<p align="center">

<image src="/Images/js_snippet09.png">

</p>

The `.call()` method & `.apply()` method, both of them take, as their first argument, a `this` keyword
So when we pass an object as the first argument, we're saying invoke the `ask()` function with the `this` context of workshop1

**losing your `this` binding** - a variation of explicit binding is called **hard binding**

<p align="center">

<image src="/Images/js_snippet10.png">

</p>

Looking at `setTimeout(workshop.ask,10,"Lost this?");` -> the method is on the workshop object, so why is it getting lost?
Because `setTimeout(workshop.ask,10,"Lost this?");` this is not the call site...
B/c of setTimeout we actually invoke the `ask()` method in the global context, where it won't find a global variable teacher, hence undefined

So the solution is to pass a hard bound function `workshop.ask.bind(workshop)` -> which is saying invoke the `ask()` method and no matter how you invoke it, always use workshop as its `this` context

In other words, the `.bind()` method, it doesn't invoke the function, it produces a new function which is bound to a particular specific `this` context
so there's a trade off - we have a predictable `this` binding.... but then
you see some scenarios where its flexibility is frustrasting and we need it to be predicatable.


So...

If I go to the trouble to write a `this` aware set of code, and then most of my call sites are using the flexible dynamism and every once in a while I have to do something like a hard binding.. then im getting a lot of benefit from that system

On the other hand, if i go through the trouble to write a `this` aware system and then everyone or most of my call sites **have** to use `.bind()`, that's a clue to me that Im doing this the hard way and should use `closures` and lexical scope instead.


### 3rd way of invoking a function: `new`
**The purpose of the new keyword is actually to invoke a function with a `this` keyword pointing at a whole new empty object**
If we have invoking function functions and pointing them at a context object

This new way of doing it is to say, I wanna invoke a function and use a whole new empty object. And the `new` keyword can accomplish that.

4 things that new does:
1. Create a brand new empty object
2. Link that object to another object
3. Call function with `this` set to the new object
4. If function does not return an object, assume return of `this`

These 4 things happen every time the `new` keyword is used.

4) 4th and final way of invoking a function

this: default binding

<p align="center">

<image src="/Images/js_snippet11.png">

</p>

So we dont specify any object, or use `call` or binding -> the fallback is to default to the global (where it finds the global variable teacher and this prints kyle)

But askAgain is in strict-mode - gets a TypeError...
In strict-mode, when you invoke it with no other `this` bindings, the default behavior is to leave it undefined
and now you're trying to access a property on an undefined value - which is a TypeError

And this makes sense, youre invoking a function without giving a `this` - because if you don't it goes hunting in global and thats horrible... 

We have to look at the call-site to determine what `this` is pointing at, you have to look at **how the function's being called!!**
because everytime it gets called, the how of the call controls what the `this` keyword will point at

<p align="center">

<image src="/Images/js_snippet12.png">

</p>

3/4 rules for `this` are in 1 line, what's the order of prescedence?

1. Is the function called by `new`? - If 'yes' the newly created object will be the `this` keyword
2. Is the function called by `call()` or apply()`? - If yes, the context object that is specified will be used.
   - **Note:** `bind()` uses apply() under the hood so this rule applies to `.bind()` as well
3. Is the funcion called on a context object? Like `workshop.ask()`? - If so, use that object
4. And if none of the previous 3 apply - we default onto the global object (except strict mode)


## 5. Prototype & __proto__

The prototype system is what the `class` keyword is built on top of

Using prototypes is uncommon now b/c of the `new` keyword

```js
function Workshop(teacher){
  this.teacher = teacher;
}

Workshop.prototype.ask = function(question){
  console.log(this.teacher, question);
};

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("Is 'prototype' a class?")
// Kyle Is 'prototype' a class?

reactJS.ask("Isnt 'prototype ugly")
// Suzy isn't 'prototype ugly?
```

The `Workshop()` function is going to act like a constructor for instances of this so-called class
And to add methods into the definition of our workshop class, we're going to add them to the prototype of the workshop constructor.

So prototype means that it is an object where any instances are going to linked to or to delegate to.
So on line 8 `var deepJS = new Workshop("Kyle");` the new keyword is gonna invoke that workshop function, and the object that gets created is going to be linked to `Workshop.prototype`
And since workshop.prototype has an `ask` method on it, on line 11. I can take that `deepJs` instance and say `deepJS.ask()`

`deepJS` the object **does not have an `ask()` method**, but it is instead prototype linked to `Workshop.prototype`
And therefore, when we say `deepJS.ask()`, it's actually going to delegate one level up the prototype chain from deepJS up to `Workshop.prototype`

And when it invokes the ask method, look at the call site down on line 11. Look at how that function is being invoked.
Remember the `this` keyword, 1 of the rules - at the call site what determines what the `this` keyword should point at
Well `var deepJS = new Workshop("Kyle");` -> here we're invoking the `ask()` method in this context of the deepJS object. 
So when we invoke `ask()` we're actually saying deepJS.teacher

or reactJS.ask() on line 5 we're actually saying reactJS.teacher

It's because we have found a function through the prototype chain, invoked it, but it still is deremine what the `this` keyword is gonna point at by the call sites on line 11 or line 14

## 6. `new`

## 7. `class`

### 7.1 `super`

### 7.2 `extends`

## 8. Closure

Closure is when a function remembers the variables outside of it, even if you pass that function elsewhere

1) A function is remembering variables outside of it, we mean variables that were declared in some outer scope
2) We can only observe that as a closure if we take that function and we pass it somewhere (return it or pass it as a callback argument or assign it to some property and pass that object around)

```js
function ask(question) {
  setTimeout(function waitASect(){
    console.log(question)
  }, 100);
}

ask("what is closure");
```

It is said that `waitASec` as a function has closure over the question variable

```js
function ask(question){
  return function holdYourQuestion(){
    console.log(question)
  };
}

var myQuestion = ask("What is closure")

myQuestion(); // What is closure
```

<hr>

We can achieve **memoization** using closures

Every time a function gets excuted it creates a brand new local memory
We create a brand new execution context, every time we run a function AND when we finish running that function we delete the execution context and the memory stored within it

Functions with memories:
- when our functions get called, we create a live store of data for that functions execution context
- when the function finishes executing, its local memory is deleted except the returned value **BUT**
- **But** what if our functions could hold onto live data between executions?
  - This would let our function definitions have an associated cache(persistant memory)
  - local memory, variable environment, state - these 3 names represent the same thing, live data at a particular moment
- But this is only possible when we **return a function from another function**

```js
function createfunction(){
  function multiplyByTwo(num){
    return num*2
  }
  return multiplyByTwo;
}

const generatedFunc = createfunction();
const result = generatedFunc(3);
```

What's happening is we execute `createfunction()` but it's only saving the function label and definition `multiplyByTwo`
Then we return `multiplyByTwo`... but what does `multiplyByTwo` mean?
We look into memory and usees the label (`multiplyByTwo`) to take the value
And function definitions are a value, a thing that can be stored
We grab the value of the label `multiplyByTwo` and return it

```js
generatedfunc = function(num) {
  return num*2
}
```

*When we return `multiplyByTwo`, it does not get returned with that lable, `multiplyByTwo`*
So `generatedFunc` **was** the result of `createfunction()`
**generatedfunc is the code that was originally `multiplyByTwo`**

```js
function outer() {
  let counter = 0
  function incrementCounter(){ counter++ }
  return incrementCounter;
}

const myNewFunction = outer()
myNewFunction() // counter = 1
myNewFunction() // counter = 2
```

This example demonstrates that when I executed outer() and saved the result of that execution in the const `myNewFunction` it returned **all** of the surrounding data from where that function was saved where it was born, where it was stored...
It grabbed its surrounding data and it was attached to the function definition!

**Everything in local memory got returned with the function definition of incrementCounter**, that's how we're able to increment counter even though it was initialized outside of the incrementCounter function definition

**How does the function get to grab onto what its surrounding data and return it out with the function definition?**

Under the hood, we would see the actual function definition and a hidden property
And in the JS engine, you know it's a hidden property when there are 2 pairs of brackets enclosing the property name
In this case its `[[scope]]` -> its a hidden property that **LINKS TO** and **WHERE** all the surrounding data is being stored
... it gives a link to where all that surrounding data is stored.

Meaning that when I return `incrementCounter()` out of `outer()` **into** `myNewFunction()` you bet it brings its hidden property and pulls that data **with it** through its hidden square bracket
- and we can't get access to this data(our backpack) unless we run `myNewFunction()` - because its private data
  - private in the sense that we cannot change the value of `counter` like this: `let counter = 100`

Anything that the function `incrementCounter()` ever makes a reference to when it would get run eventually gets pulled out with the function on its back into `myNewFunction()`

- But if there's a variable that is never referenced and it gets returned out then there's no point of that variable being in the backpack and would therefore be a memory leak

The "correct" term which is used to refer to the thing that results in the backpack existing and they call the backpack this umbrella term "closure" 

People call local memory -> variable environment | some developers call the backpack the "c.o.v.e"
that is to say we close the lid on the data, "closed over the variable environment" (cove)
the data in the cove is persistant, it never gets deleted

Scope is the rules in any programming language, for at any given line of code, what data do I have available to me?
JS has lexical(static) scoping:

that is where I save my function determines for the rest of that life, for the life of that function.
Whenever it gets run, under whatever label is gets, what data it will have access to when that function runs

So **Persistant lexically scoped referenced data**, our rule is...where my function was saved determines what data I have access to, when its eventually run -> which is why we must return the nested function... to save all the data surrounding it

So P.L.S.R.D -> otherwise called closures

However, **closures are too complex** to have an umberlla term
The backpack is a result of Javascript being a lexically scoped language

Closures give our functions persistant memory

- allow iterators and generators to be possible
- module pattern
- asynchronous JS - callbacks and promises rely on closures to persist state in an asychronous environment

So since JS is a lexical scoped language - that means that even if I returned my function out and theoretically all the memory in our execution context's local memory should get deleted -> **nope!**
B/c I have this fundamental rule of lexically scoped language
I'm going to grab all that data and pull it out on the backpack such that when I run the function, I still have all the data from when the function was born.





## 9. Asynchronous Javascript

**XMLHttpRequest Synchronous**

Before async Javascript was a thing, we used XMLHttpRequest(XHR) to call an API to get data without refreshing our page

The XHR is event-based. So when we used to make an AJAX call, all the code below the call had to wait until we got our response back from the server (aka synchronous). **Our Javascript was blocking all the other code.**

If we got back an error, instead of the response we expected, then the errors in our Javascript became huge:

```javascript
function AJAX(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send(null);

  if (xhr.status === 200) {
    console.log(xhr.responseText);
    cb(xhr.responseText)
  }
}
AJAX('https://api.github.com/users/github', function(data){
  console.log('AJAX', data)
})
```

#### Fetch: making promises based asynchronous AJAX requests

The Fetch API is a new, more powerful replacement of the XHR - fully async and Promise based

```js
fetch('http://example.com/movies.json').then(function(response) {
  return response.json()
})
.then(function(myJson){
  console.log(JSON.stringify(myJson))
})
```

Fetch makes more sense, since you can read in order which steps it takes

### 9.1 Promises

<p align="center">

<image src="/Images/promises.png">

</p>


**Fulfillment**

One day, I fulfill that promise. It makes you so happy that you post about it on Twitter!

**Rejection**

One day, I tell you that I can't fulfill the promise

You make a sad post on Twitter about how I didn't do what I had promised.

Both scenarios cause an action. The first is a positive one, and the next is a negative one.

Keep this scenario in mind while going through how Javascript `promises` work.

**When to use a promise**

Javascript is a synchronous. It runs from top to bottom. Every line of code below will wait for the execution of the code above it

But when you want to get data from an API, you don't know how fast you will get the data back. Rather, you don't know if you will get the data or an error yet,

Errors happen all the time, and those things can't be planned. But we can be prepared for it.

So when you're waiting to get a result from the API, your code is blocking the browser.
It will freeze the browser. Neither we nor our users are happy about that at all!

Perfect situation for a `Promise`!

**How to use a Promise**

Now that we know that you should use a `Promise` when you make Ajax requests, we can dive into using `Promises`. First, I will show you how to define a function that returns a `Promise`. Then, we will dive into how you can use a function that returns a `Promise`

```js
function doSomething(value){
  return new Promise((resolve, reject) => {
    // Fake a API call
    setTimeout(() => {
      if(value) {
        resolve(value)
      }
      else {
        reject('The value was not truthy')
      }
    }, 5000)
  })
}
```

This function returns a `promise`. This `promise` can be resolved or rejected

Like a real-life promise, a `promise` can be fulfilled or rejected

**Use a function with a promise**

Using a function that returns a `Promise`

```js
doSomething().then((result) => {
  // Do something with the result
}.catch(error){
  console.error('Error message: ', error)
})

// Use a return Promise with Async/Await

(async () => {
  let data = null
  try {
    data = await doSomething()
    // So something with the result
  } catch(error) {
    console.err('Error message: ', error)
  }
})();
```

<hr>

```js
let wordnikAPI = "https://api.wordnik.com/v4/words"
let giphyAPI = "https://api.gihpy.com/v1/gifs/search"

function setup() {
  noCanvas();
  loadJSON(wordnikAPI, gotData)
}

function gotData(data){
  createP(data.word)
  loadJSON(giphyAPI + data.word + gotDataData);
}

function gotDataData(data){
  console.log(data.data[0].images)
  createImg(data.data[0].images['fixed_height_small'].url)
}
```

*This snippet uses the p5 library so functions like createImg(), loadJSON(), createP(), they come from there*
For `loadJSON()` we pass in a url and a callback function

But the problem with this pattern is we fall into something called "callback hell"

And we need to pass multiple callback functions to handle different scenarios.

Callback functions are more useful for events, when the mouse is pressed, trigger this function its an event

But if I want to sequence asychronous things that happen in my program, multiple api requests etc, you'll drown in callback hell

```js
function setup(){
  noCanvas()
  loadJSON(wordnikAPI, function(data){
    createP(data.word)
    loadJSON(giphyAPI + data.word, function(data){
      console.log(data.data[0].images)
      createImg(data.data[0].images['fixed_height_small'].url)
    })
  })
}
```
This still works but if something fails, everything breaks unless we pass a callback function that'll deal with the error
But notice how indented everything gets, and we can keep going, passing more and more functions
We need error callbacks, success callbacks... etc

Promises have 3 states:

1. pending
2. fulfilled
3. rejected

We can use the built in `.then()` to act on the promise when the state is `fulfilled`
Or we can use the built in `.catch()` to act on the promise if the state is `rejected`

```js
function setup(){
  noCanvas();

  fetch(wordnikAPI)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
```

The great thing about the new promise chaining is, we can have multiple `.then()` functions
and as long as `.catch()` is at the bottom, it'll catch the error no matter where the error occurs

It's also important to note that in order to successfully chain `.then()` functions you need to return promises
Shorthand arrow function syntax automatically returns it when its 1 line

```js
function setup(){
  noCanvas()
  fetch(wordnikAPI)
    .then(response => {
      return response.json();
    })
    .then(json => {
      createP(json.word)
      return fetch(giphyAPI + json.word)
    })
    .then(response => {
      createImg(json.data[0].images['fixed_height_small'].url)
    })
    .catch(err => console.log(err))
}
```
So the finished product looks like this

JS also supports promises natively
```js
function setup(){
  noCanvas();
  delay(1000)
    .then(() => createP('hello'))
    .catch((err) => console.error(err))
}

function delay(time){
  return new Promise()
}

```
This will throw an error, 'Promise resolver undefined is not a function at new Promise'
If I want to make my own promise, I have to provide pathways to resolve the promise and rejection.

So we do this:
```js
function setup(){
  deplay('blah blah')
    .then(() => createP('hello'))
    .catch(() => console.error(err))
}

function delay(time){
  return new Promise((resolve, reject) => {
    if (isNaN(time)){
      reject(new Error('delay requires a valid number'))
    }
    setTimeout(resolve, time)
  })
}
```
So we write an anonymous function that'll handle how we resolve/reject the promises

### 9.2 Iterators

```js
const numbers [4,5,6]

for(let i = 0; i <numbers.length; i++){
  console.log(numbers[i]);
}
```

Programs store data and apply function to it.
But there are 2 two parts to applying functions to collections of data

1. The process of accessing each element
2. What we want to do to each element

Iterators automate the accessing of each element - so we can focus on what to do to each element, and make it available to us in a smooth way

Iterators allow functions to stores elements and each time we run the function it would return out the next element
*Our function has to remember which element was next up*

To make this easier, we need to think of our array/list as a "stream/flow" of data with our functions returning the next element from out "stream"

```js
function createNewFunction(){
  function add(num){
    return num + 2;
  }
  return add2;
}

const newFunction = createNewFunction();
const result = newFunction(3);
```

When we return a function from another function we get a bonus...
This bonus will be critical for us to build out our own functions that when we call them gives us our next element from our flow of data, in other words an iterator

We want to create a function that holds both our array, the position we are currently at in our stream of elements
And has the ability to return the next element

```js
function createFunction(array){
  let i = 0;
  function inner(){
    const element = array[i];
    i++;
    return element;
  }
  return inner;
}

const returnNextElement = createFunction([4,5,6]);
const element1 = returnNextElement(); // 1
const element2 = returnNextElement(); // 2
```

When the function 'inner' is defined, it gets a bond to the surrounding Local Memory in which it has been defined

When we return out `inner()`, that surrounding live data is returned out too, attached on the "back" of the function definition itself (which we now give a new global label "returnNextElement")

When we call `returnNextElement` and don't find "array" or "i" in the immediate execution context, we look into the function defienition "backpack" of persistent live data

Any function that when called returns out the next element from my flow od data is called an: iterator

So iterators turn our data into "streams" of actual values we can access one after another
Now we have functions that:

- hold our underlying array
- the position we're currently at in the array
- and return out the next item in the 'stream' of elements from our array when run

Iterators are powerful in that they provide a means to access items in a collection one at a time, while keeping track of the current index, built-in iterators are actually objects with a `next` method that when called returns the next element from the "stream"/flow

```js
function makeIterator(array) {
  let nextIndex = 0;
  console.log("nextInde =>", nextIndex);

  return(
    next: function(){
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false}
        : { done: true };
    }
  );
}

let it = makeIterator(["simple","iterator"]);

console.log(it.next()); // {value: 'simple, done: false}
console.log(it.next()); // {value: 'iterator, done: false}
console.log(it.next()); // {done: true}
```

Above we pass in a simple array with 2 values and we iterate over the values by 
calling it.next().

### 9.3 Generators

Generators are functions that serve as a factory for iterators.

```js
function* sample(){
  yield "simple";
  yield "generator";
}

let it = sample();

console.log(it.next()); // {value: 'simple, done: false}
console.log(it.next()); // {value: 'generator, done: false}
console.log(it.next()); // {value: undefined. done true}
```

*Note the syntax*, the `*` indicates that the function is a generator and
the `yield` keyword which pauses function exection and returns(yields) a value

2 parts of a Generator:

- **Generator Function** → defined with an asterisk *near* the function name or keyword
- **Generator Iterator** → created when you invoke the Generator Function

Communication with Generators can happen in both directions,
Generators can yield values to iterators, but
iterators can also send values to Geneartors in the `iterator.next('somevalue')` method

```js
function* favBeer(){
  const reply = yield "What is your favorite type of beer?";
  console.log(reply);
  if (reply !== "ipa") return "No soup for you!";
  return "Ok, soup"
}

{
  const it = favBeer();
  const q = it.next().value; // Iterator asks question
  console.log(q);
  const a = it.next("lager").value; // Question is answered
  console.log(a);
}

// What is your favorite beer?
// lager
// No soup for you!

{
  const it = favBeer();
  const q = it.next().value; // Iterator asks question
  console.log(q);
  const a = it.next("ipa").value; // Question is answered
  console.log(a);
}

// What is your favorite beer?
// ipa
// OK, soup.
```

So Generators + Promises form the foundation for the async/await expression
Instead of yielding values the Generator yielded Promise functions
Then wrap the generator in a function that could wait for the Promise to resolve and return the Promise value to the Generator in the `.next()` method

There is a popular library called **coroutines** that does just that

```js
co(function* doStuff){
  let result = yield someAsyncMethod();
  let another = yield anotherAsyncFunction();
}
```

### 9.4 Async/Await

Async/Await built from Generators

In asynchronous JS we want to:

1) Intiate a task that takes a long time (e.g requesting data from the server)
2) Move on to more synchronous regular code in the meantime
3) Run some functionality once the requested data has come back

*What if we were to yield out of the function at the moment of sending off the long-time task and return to the function only when the task is complete*

`returnNextElement` is a special object(a generator object) that when its 'next' method is run → starts (or continues) running `createFlow` until it hits yield and returns out the value byeing "yielded"

```js
function* createFlow(){
  const num = 10;
  const newNum = yield num;
  yield 5 + newNum;
  yield 6;
}

const returnNextElement = createFlow();
const element1 = returnNextElement.next(); // 10
const element2 = returnNextElement.next(); // 7
```

We end up with a "stream"/flow of values that we can get one-by-one by running returnNextElement.next()

With generator objects we have a property that tells us where we left off so we can pick up where we left off

We can use the ability to pause `createFlow's` running and then restart it only when our data returns

```js
function doWhenDataReceived(value){
  returnNextElement.next(value);
}

function* createFlow(){
  const data = yield fetch("http://twitter.com/lenny/tweets/1");
  console.log(data)
}

const returnNextElement = createFlow();
const futureData = returnNextElement.next();

futureData.then(doWhenDataReceived)
```
*This code is basically building Async/Await by scratch*

We get to control when we return back to `createFlow` and continue executing
By setting up the trigger to do so (returnNextElement.next()) to be run by our function that was triggered by the promise resolution (when the value returned from Twitter)

![Async/Await](Images/AsyncAwait.png)

```js
(async () => {
  const resp = await fetch("https://api.github.com/users/github");
  const jsonData = await resp.json();
  console.log("jsonData: ", jsonData);
})();
```

To use `await` with the `Fetch`, we have to wrap it in a `sync` fuction
In this case, we wrapped it in an IIFE *(Immediately Invoking Function Expression)*

When the fetch has returned a `Promise` the first time, the result is put in the `const resp`, so the next variable waits until the fetch gets a response. The console is only outputting data whn the `jsonData` variable has got the data.

# 10. Functional Programming
### 10.1 Pure Functions

Pure functions take in an input and outputs something

How is that different from other functions?

The functions we typically write have side effects, such as turning on LEDS, event handlers, etc
Pure functions are functions that do not have any side effects
all it looks at is whatever is passed in as an input, and returns its output value.

Not Pure:

```js
let name = "Lenny"

function greet() {
  console.log(`Hello, ${name}`);
}

greet(); // Hello Lenny

name = "Harry"
greet(); // Hello Harry
```

Pure:

```js

function greet(name) {
  console.log(`Hello, ${name}`);
}

greet("Lenny"); // Hello, Lenny
greet("Harry"); // Hello, Harry
```

The first snippet is not a pure function because the side effect is output is unexpected when the global variable `name` changes. No return statement is also an indication of an unpure function, and logging something to console is a **side-effect!**

Whereas in the second snippet we know the exact output because we're passing in the value

Some great guiding principles for function programming are:

1) Do everything with functions
    - Our program needs to become a function
    - So instead of thinking again about a program as an impertive series of commands of "we have to do this and then that and then the other thing
    - We can start thinking of our program as a function. What are the inputs to my function, what are the outputs.
    - This is a different way of thinking... we're used to "how should my program run", which is an imperative question to ask ourselves. We **should** be asking ourselves: "What should my program take in? And what should my program, return out?"

Imperitve:

```js
let name = "Alonzo";
let greeting = "Hi";

console.log(`${greeting}, ${name}!`);
// Hi, Alonzo!

greeting = "Howdy";
console.log(`${greeting}, ${name}!`);
// Howdy, Alonzo!
```
Here we have a series of commands, where are the inputs, what are the outputs?
We're not really asking ourselves questions in the imperative style.

But in the Functional Style:

```js
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

greet("Hi", "Alonzo");
// "Hi, Alonzo!"

greet("Howdy", "Alan");
// "Howdy, Alan!
```

Our program takes in 2 inputs (1) Greeting (2) Name

Functional programming is great for data transformation, where you know what type of thing is coming in, and what thing you want to come out.

**So avoid side effects**!

Side Effects:

```js
let thesis = {name: "Church's", date: 1936};

function renameThesis(newName) {
    thesis.name = newName;
    console.log("Renamed!");
}

renameThesis("Church-Turing"); // Renamed!
thesis; //{name: "Church-Turing", date: 1936}
```

No Side Effects:

```js
const thesis = {name: "Church's", date: 1936};

function renameThesis(oldThesis, newName) {
  return {
    name: newName, date: oldThesis.date
  }
}

const thesis2 = renameThesis(thesis, "Church-Turing"); 
thesis; // {name: "Church's", date: 1936}
thesis2; // {name: "Church-Turing", date: 1936}
```

A pure function has two characteristics:

No Side Effects: A pure function has no effect on the program or the world besides outputting its return value
Deterministic: Given the same input values, a pure function will always return the same output. This is because its return value depends only on its input parameters, and not on any other information (e.g. global program state)

[examples]()

### 10.2 Recursion

Iteration: imperative looping stateful
Recursion: functional self-referential stateless

These 2 are concepts are different ways of thinking about how to get the computer to do the same operation, lots of different times.

In the iteration mini paradigm or sub-paradigm, we think about that repetition in terms of loops for `for` or `while` usually.
And that loop as we go, we're probably going to be changing some variable like a counter or like `i`
an element of an array. So we have a value changing over time, which means it's stateful.
And when you have a complex iterative loop, sometimes it can be hard to think about what the value of `i` is, which loop are we in, hard to think about state.

In the recursive sub-paradigm, instead of using `for`, `while`, stateful loops, we're going to use self reference.
We're going to have a function call itself from within itself, so we have an "inception" of self-reference.
And that's how we're going to execute the same chunk of code multiple times.

iterative code:

```js
function sum(numbers){
  let total = 0;
  for(let i = 0; i < numbers.length; i++){
    total += numbers[i]
  }
  return total
}
```

Now let's make it recursive

```js
function sum(numbers){
  if(numbers.length === 1){
    // base case
    return numbers[0]
  }
  else {
    // recursive case
    return numbers[0] + sum(numbers.slice(1));
  }
}

sum([0,1,2,3,4]);
```

Recursive functions have 2 parts:

1) base case
2) Recursive case

> Remember to mention the arity of a function (how many inputs a function is expecting)

### 10.3 Higher-Order Functions

We say a language has "first-class functions" if it supports functions being passed as input or output values of other functions. 
JS has this feature, and JavaScripters take advantage of it all the time - for example, it's what allows us to pass a callback function as an input parameter for another function. 
It's also possible to have a function as a return value. 
A function which either takes or returns another function is called a higher-order function.

The higher-order functions `filter()`, `map()`, and `reduce()` are three of the most useful tools in a functional programmer's toolbox.

**[Filter](Code/filter.js)**
In the above file you can find examples of how these higher order functions work

The filter function takes a "predicate" function (a function that takes in a value and returns a boolean) and an array, 
applies the predicate function to each value in the array,
and returns a new array with only those values for which the predicate function returns true.

Here is an implementation of filter:

```js
wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function filter(predicateFn, array) {
  if (length(array) === 0) return [];
  const firstItem = head(array);
  const filteredFirst = predicateFn(firstItem) ? [firstItem] : [];
  return concat(filteredFirst, filter(predicateFn, tail(array)));
}

function isEven(n) {
  return n % 2 === 0;
}

evens = filter(isEven, wholes) // [0, 2, 4, 6, 8, 10]

// filetedFirst = isEven(0) ? [firstItem] ; []
// isEven is our predicateFn

// concat(0, filter(predicateFn, [1,2,3,4,5,6,7,8,9,10]))
// concat([], filter(predicateFn, [2,3,4,5,6,7,8,9,10])
// concat(2, filter(predicateFn, [3,4,5,6,7,8,9,10])
// concat([], filter(predicateFn, [4,5,6,7,8,9,10])
// concat(4, filter(predicateFn, [5,6,7,8,9,10])
// concat([], filter(predicateFn, [6,7,8,9,10])
// concat(6, filter(predicateFn, [7,8,9,10])
// concat([], filter(predicateFn, [8,9,10])
// concat(8, filter(predicateFn, [9,10])
// concat([], filter(predicateFn, [10])
// concat(10, filter(predicateFn, [])

// Now we start resolving our chain of functions

// concat(10, filter(predicateFn, []) -> [10]
// concat([], filter(predicateFn, [10]) -> [10]
// concat(8, filter(predicateFn, [10]) -> [8, 10]
// concat([], filter(predicateFn, [8, 10]) -> [8, 10]
// concat(6, filter(predicateFn, [8, 10]) -> [6, 8, 10]
// concat([], filter(predicateFn, [6, 8, 10]) -> [6, 8, 10]
// concat(4, filter(predicateFn, [6, 8, 10]) -> [4, 6, 8, 10]
// concat([], filter(predicateFn, [4, 6, 8, 10]) -> [4, 6, 8, 10]
// concat(2, filter(predicateFn, [4, 6, 8, 10]) -> [2, 4, 6, 8, 10]
// concat([], filter(predicateFn, [2, 4, 6, 8, 10]) -> [2, 4, 6, 8, 10]
// concat(0, filter(predicateFn, [2, 4, 6, 8, 10])) -> [0, 2, 4, 6, 8, 10]
```

**[Map](Code/map.js)**

The map function takes a one-argument function and an array, and applies the function to each element in the array, returning a new array of the resulting values.

To move towards a functional mindset, these helper functions are very useful instead of the equivalent object-oriented array methods:

- head(array) to return the first element of an array (e.g. head([1,2,3]) -> 1)
- tail(array) to return the rest of the array after the first element (e.g. tail([1,2,3]) returns [2,3])
- length(array) to return the number of elements in the array (e.g. length([1,2,3]) returns 3)

```js
wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
function map(fn, array) {
  if (length(array) === 0) return []; // map always retuns a new array - so if map gets called on an empty array - return an empty array
// Return the number of items in an array
  return [fn(head(array))].concat(map(fn, tail(array))); // so here we perform the transformation (call the function on the head of the array)
  // THEN combine it with the rest of the array, where do we a recursive call to continue working on the rest of the array
}

doubled = map(n => n * 2, wholes) // [0,2,4,6,8,10,12,14,16,18,20]
// doesn't concatenate the arrays until it finishes all the recursive calls
// [fn(0)].concat(map(fn, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) -> [fn(1)].concat(map(fn, [2, 3, 4, 5, 6, 7, 8, 9, 10]))
// [fn(2)].concat(map(fn, [3, 4, 5, 6, 7, 8, 9, 10])) -> [fn(3)].concat(map(fn, [4, 5, 6, 7, 8, 9, 10]))
// [fn(4)].concat(map(fn, [5, 6, 7, 8, 9, 10])) -> [fn(5)].concat(map(fn, [6, 7, 8, 9, 10]))
// [fn(6)].concat(map(fn, [6, 7, 8, 9, 10])) -> [fn(7)].concat(map(fn, [7, 8, 9, 10]))
// [fn(8)].concat(map(fn, [8, 9, 10])) -> [fn(9)].concat(map(fn, [10]))
// [fn(10)].concat(map(fn, [])) -> here we've reached our base case

// start resolving each resursive call

// [fn(10)].concat([]) -> [20]
// [fn(9)].concat([20]) -> [18,20]
// [fn(8)].concat([18,20]) -> [16,18,20]
// [fn(7)].concat([[16,18,20]]) -> [14,16,18,20]
// [fn(6)].concat([14,16,18,20]) -> [12,14,16,18,20]
// [fn(5)].concat([12,14,16,18,20]) -> [10,12,14,16,18,20]
// [fn(4)].concat([10,12,14,16,18,20]) -> [8,10,12,14,16,18,20]
// [fn(3)].concat([8,10,12,14,16,18,20]) -> [6,8,10,12,14,16,18,20]
// [fn(2)].concat([6,8,10,12,14,16,18,20]) -> [4,6,8,10,12,14,16,18,20]
// [fn(1)].concat([4,6,8,10,12,14,16,18,20]) -> [2,4,6,8,10,12,14,16,18,20]
// [fn(0)].concat([0,2,4,6,8,10,12,14,16,18,20]) -> [0,2,4,6,8,10,12,14,16,18,20]
```

**[Reduce](Code/reduce.js)**

The reduce function is the odd one of the bunch. Unlike filter and map, which each take an array and return another array, reduce takes in an array and returns a single value - in other words, it "reduces" an array to a single value.

reduce takes three arguments:

- a "reducer" function, which takes two arguments - an accumulator and the next value from the array - and returns a single value. This function will be applied to each value in the array, with the accumulator storing the reduced value so far.
- an initial value, passed to the first call of the reducer function
- the array to reduce

```js
const wholes = [0, 1, 2, 3, 4, 5];

function reduce(reducerFn, initialValue, array) {
  if (length(array) === 0) return initialValue;
  const newInitialValue = reducerFn(initialValue, head(array)); // this line calculates 1 value
  console.log("newInitialValue: " + newInitialValue);
  return reduce(reducerFn, newInitialValue, tail(array)); // this line will recursively call itself so we can get through the rest of the elements in the array
}

sum = reduce((accumulator, value) => { return accumulator + value;}, 0, wholes) // sum = 15

/**
 * [0,1,2,3,4,5]
 * 
 * reducerFn -> (accumulator, value) => return accumulator + value // so we're just adding inputA and inputB
 * initialValue -> 0
 * wholes -> [0,1,2,3,4,5]
 * 
 * newInitialValue = reducerFn -> return 0 + 0 = 0
 * return reduce(reducerFn, 0, [1,2,3,4,5]) // notice how we splice the array - we NEED to remove the initial value so we can continue to work with the "head"
 * 
 * newInitialValue = reducerFn -> return 0 + 1 = 1
 * return reduce(reducerFn, 1, [2,3,4,5])
 * 
 * newInitialValue = reducerFn -> return 1 + 2 = 3
 * return reduce(reducerFn, 3, [3,4,5])
 * 
 * newInitialValue = reducerFn -> return 3 + 3 = 6
 * return reduce(reducerFn, 6, [4,5])
 * 
 * newInitialValue = reducerFn -> return 6 + 4 = 10
 * return reduce(reducerFn, 10, [5])
 * 
 * newInitialValue = reducerFn -> return 10 + 5 = 15
 * return reduce(reducerFn, 15, []) -> 15
 */
```

The functions below let us work with JavaScript arrays using a functional API (e.g. length(array)), instead of the usual object-oriented method-calling API (e.g. array.length).

```js
concat = ƒ(array1, array2)
// Concatenate two arrays into a new single array
function concat(array1, array2) {
  return array1.concat(array2);
}

length = f(array)
// Return the number of items in an array
function length(array) {
  return array.length;
}

head = ƒ(array)
// Return the first item in an array
function head(array) {
  return array[0];
}

tail = ƒ(array)
// Return the rest of an array after the first item
function tail(array) {
  return array.slice(1);
}
```
