# Understanding JavaScript Concepts

## Functions

Function declarations vs Function expressions

```js
function teacher() { /* ..  */}
// This is a function declaration

const nameImprover = function(name, adj) {
  return 'Col' + name + ' MC' + adj + ' pants';
}
// This is an anonymous function expression

const nameImprover = function nameImprover(name, adi){
  return 'Col' + name + ' MC' + adj + ' pants';
}
// Named function expressions
```
<p align="center">

<image src="/Images/js_snippet01.png">

</p>

**It's a stylistic choice based on scope**!

```js {.line-numbers}
function teacher() { /* .. */ }

const myTeacher = function anotherTeacher(){
  console.log(anotherTeacher)
}

console.log(teacher);
console.log(myTeacher);
console.log(anotherTeacher);
```

The last console log - will throw a ReferenceError, there is no `anotherTeacher()` global scope will never had heard of this function

**One of the key differences** between *function declarations* and *function expressions* is that function declarations and their name they are attached to the enclosing scope

Where as function expressions are attached to their own scope
Function expressions put their identifier into their own scope.

There's also a little nuance... `anotherTeacher()` is read-only - you cannot reassign `anotherTeacher()` on line 4, you could not reassign it to some other value

Why would you actually have the named function on the right side of the expression?
- You've probably more often seen it as an anonymous function there...
- And we're about to discuss the difference between what are so-called named functions expressions and the more common anonymous function expressions


### IIFEs, which stands for Immediately Invoked Function Expression

```js
var teacher = 'Will'

(function anotherTeacher(){
  var teacher = 'Kyle'
  console.log(teacher) // Kyle
})();

console.log(teacher)
```

You'll notice that from the beginning of the declaration of `anotherTeacher()` there's a wrapping set of parenthesis around that function
That's what makes it a function expression, instead of a function declaration.

And then at the end of the function definition, you can see an extra set of parenthesis, which means it's getting invoked. Hence the 'immediately ivoked' part of the name

It's being executed immediately after we describe that function expression as a value, it immediately invokes it.

And thats what makes it an IIFE, and the main end result of an IIFE is we get a new block of scope, there's a block of scope inside of that function `anotherTeacher()`

### End of IIFE



## Named function expressions


A function expression thats been given a name.

```js
var clickHandler = function() {
  // ...
}

var keyHandler = function keyHandler(){
  // ...
}
```
One line 1, i'm declaring a function expression - why is it a function expression? - because its not a function declaration.. How do we know if somethings a function declaration? If the word function is literally the first thing in the statement.
So if it's not the first thing in the statement, if there's a variable or an operator or a parenthesis or anything, then it's not a declaration... **it is an expression**
**BUT** we see no name, so it's an anonymous function expressions

whereas the one on line 5 is a named function expression.

So setting aside the differences between the two, here I just want to focus our attention to the difference between anonymous function expressions and named function expressions
Even though anonymous function expressions are vastly more common, vastly more popular, most of you probably have never even seen a named function expression (Thats how uncommon and unpopular it is) Im going to make the claim that you should always (100%, 0 exceptions) you should prefer named function expression over the anonymous function expression

Why?

1. The name produces or creates a reliable self reference to the function from inside of itself. that's useful if youre going to make the function recursive, if that function is an event handler of some sort and it needs to reference itself to **unbind itself**, its useful if you need to access any properties on that function object (i.e name, length, etc). Any time you need a self reference to the function, the single only right answer to that question is, it needs to have a name.
2. More debuggable stack traces - in the stack traces you'll get `Anonymous Function` in the stack traces - but if you used a named function expression then you know exactly where your code is failing, or whats getting called or not getting called
3. More self-documenting code - we have to read the function body of an anonymous function and where its being called to **infer** what that function is doing... Where as 


## Arrow functions

```js
var ids = people.map(person => person.id);

var ids = people.map(function getId(person){
  return person.id;
})
```

arrow functions are anonymous... kyle doesn't think you should use anonymous function expressions... for the reasons above

**You should definitely not be using arrow functions for general replacements for all other functions** !
You shouldn't be using them because theyre short and concise...
The shorter the syntax the more complex the edge cases are...

The arrow function (while obvious) the reader still has to infer the purpose of the function
Whereas the second one we know it gets an ID, we could even call it `getPersonID()`

Promise-chains are other scenarios you might use arrow functions

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

Named function Expressions vs Anonymous function expressions

well you can still do Named (Arrow) Function Expressions...

```js
var getID = person => person.id;
var ids = people.map(getID)

// ****************************

var getDataFrom = person => getData(person.id);
getPerson()
.then(getDataFrom)
.then(renderData);
```

Its more characters to define the function as an arrow function then it is to make it a function declaration

So Kyle's thoughts on functions (which he prefers)

1. (Named) Function Declarations
2. Named Function Expressions
3. Anonymous Function Expressions

## block scoping with let

```js
var teacher = 'kyle'
{
  let teacher = "Suzy"
  console.log(teacher) // Suzy
}
console.log(teacher) // kyle
```

```js

function diff(x,y) {
  if (x > y) {
    let tmp = x;
    x = y;
    y = tmp;
  }

  return y - x
}
```

This is great bc tmp only exists in the if statement, no where else

Kyle's stylistic opinion:
`var` always behave as if it belongs to the function
`lets` are great inside of blocks

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

```js
var nameImprover = (name, adj) => {
  return `Col ${name} Mc ${adj} pants`;
}

$('body').hide();

myArr.forEach(val => console.log(val))

$('button').on('click', () => {
  console.log('Click me');
})
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


## Scope & this

Scope: where to look for things

```js
var teacher = 'kyle'

function otherClass() {
  teacher = 'Suzy'
  topic = 'react'
  console.log("Welcome")
}

otherClass(); // Welcome

teacher; // Suzy
topic; // React -> this variable wasn't defined anywhere so JS does ahead and makes it in the global scope (this is while JS is in "sloppy-mode" not strict-mode)
```

undefined vs undeclared

undefined is a variable that has been declared, but it doesn't have a value
undeclared is one that was never declared anywhere, and JS has no idea where it is

A function's `this` references the execution context for that call, determined **entirely** by **how the function was called**
It's not about the definition of the function, it's not where the function is, it's not what the function belongs to, **none of that matters**
It's only how the function was called that determines what the `this` keyword is pointing at.

```
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

```
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

```js
var teacher = "kyle";

function ask(question){
  console.log(teacher, question);
}

function otherClass() {
  var teacher = "Suzy";

  ask("Why?");
}

otherClass()
```

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

```js
var workshop = {
  teacher: "kyle",
  ask(question) {
    console.log(this.teacher, question)
  }
}

workshop.ask("what is implicit binding?")
// kyle what is implicit binding
```

You'll notice i have a workshop objec with a method on it that is `this` aware.
That's called the `namespace pattern`

how does the `this` keyword behave in the namespace pattern?

When we invoke the `ask()` method on the workshop objecy, how does it figure out what the `this` keyword should point at?
> The Call Site
> Because of the call site the `this` keyword is going to end up pointing at the object that is used to invoke it, which in this case is the workshop object
> `workshop.ask()` says invoke `ask()` with the `this` keyword pointing at workshop - thats what the implicit binding rule says
> And thats how the `this` keyword works in all other languages - so this is the most common and intuitive 

2) this: dynamic binding -> sharing

```js
function ask(question) {
  console.log(this.teacher, question)
}

var workshop1 = {
  teacher: "Kyle",
  ask: ask;
}

var workshop2 = {
  teacher: "Suzy",
  ask: ask
}

workshop1.ask("How do I share a method?");
// Kyle How do I share a method?

workshop2.ask("How do I share a method?");
// Suzy How do I share a method?
```

Im sharing the ask function across 2 different objects: workshop1 and workshop2
With the help of the implicit binding rule, `this` points to the object - so its invoked in 2 different contexts (again to the dynamic flexibility)

3) this: explicit binding

```js
function ask(question) {
  console.log(this.teacher, question)
}

var workshop1 = {
  teacher: "Kyle",
  ask: ask;
}

var workshop2 = {
  teacher: "Suzy",
  ask: ask
}

ask.call(workshop1, "Can I explicitly set context?");
// Kyle "Can I explicitly set context?"

ask.call(workshop2, "How do I share a method?");
// Suzy "Can I explicitly set context?"
```

The `.call()` method & `.apply()` method, both of them take, as their first argument, a `this` keyword
So when we pass an object as the first argument, we're saying invoke the `ask()` function with the `this` context of workshop1

**losing your `this` binding** - a variation of explicit binding is called **hard binding**

```js
var workshop = {
  teacher: "Kyle",
  ask(question) {
    console.log(this.teacher, question)
  }
}

setTimeout(workshop.ask,10,"Lost this?");
// undefined Lost This?

setTimeout(workshop.ask.bind(workshop), 10, "Hard bound this?");[
// Kyle Hard bound this?
```

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


## 3rd way of invoking a function: `new`
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

```js
var teacher = "Kyle";

function ask(question){
  console.log(this.teacher, question)
}

function askAgain(question){
  "use strict";
  console.log(this.teacher, question)
}

ask("what's the non-strict-mode default?")
// Kyle what's the non-strict-mode default

askAgain("what's the strict-mode default?");
// Type Error
```

So we dont specify any object, or use `call` or binding -> the fallback is to default to the global (where it finds the global variable teacher and this prints kyle)

But askAgain is in strict-mode - gets a TypeError...
In strict-mode, when you invoke it with no other `this` bindings, the default behavior is to leave it undefined
and now you're trying to access a property on an undefined value - which is a TypeError

And this makes sense, youre invoking a function without giving a `this` - because if you don't it goes hunting in global and thats horrible... 

We have to look at the call-site to determine what `this` is pointing at, you have to look at **how the function's being called!!**
because everytime it gets called, the how of the call controls what the `this` keyword will point at

```js
var workshop = {
  teacher: "kyle",
  ask: function ask(question) {
    console.log(this.teacher, question);
  }
}

new (workshop.ask.bind(workshop))("What does this do?");
```

3/4 rules for `this` are in 1 line, what's the order of prescedence?

1. Is the function called by `new`? - If 'yes' the newly created object will be the `this` keyword
2. Is the function called by `call()` or apply()`? - If yes, the context object that is specified will be used.
   - **Note:** `bind()` uses apply() under the hood so this rule applies to `.bind()` as well
3. Is the funcion called on a context object? Like `workshop.ask()`? - If so, use that object
4. And if none of the previous 3 apply - we default onto the global object (except strict mode)

## Arrow-functions and `this`

```js
var workshop = {
  teacher: "kyle",
  ask(question) {
    setTimeout(() => {
      console.log(this.teacher,question);
    }, 100);
  }
}

workshop.ask("Is this lexical `this`?");
// Kyle Is this lexical 'this'?
```

Here `this` is correctly pointing to the workshop object
**How is this not implicit binding???????**
The behavior is actually called "lexical `this` behavior

Lexical `this`: many people think that an arrow function is essentially a hardbound function to the parent's `this`... this is not accurate
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


```js
var workshop = {
  teacher: "kyle",
  ask: (question) => {
    console.log(this.teacher, question)
  }
}

workshop.ask("What happened to 'this'?");
// undefined What happened to 'this'?

workshop.ask.call(workshop,"Still no 'this'?");
// undefined Still no 'this'?
```

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

## Asynchronous Javascript

## Closure

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

## Promises

#### Fulfillment

One day, I fulfill that promise. It makes you so happy that you post about it on Twitter!

#### Rejection

One day, I tell you that I can't fulfill the promise

You make a sad post on Twitter about how I didn't do what I had promised.

Both scenarios cause an action. The first is a positive one, and the next is a negative one.

Keep this scenario in mind while going through how Javascript `promises` work.

#### When to use a promise

Javascript is a synchronous. It runs from top to bottom. Every line of code below will wait for the execution of the code above it

But when you want to get data from an API, you don't know how fast you will get the data back. Rather, you don't know if you will get the data or an error yet,

Errors happen all the time, and those things can't be planned. But we can be prepared for it.

So when you're waiting to get a result from the API, your code is blocking the browser.
It will freeze the browser. Neither we nor our users are happy about that at all!

Perfect situation for a `Promise`!

#### How to use a Promise

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

#### Use a function with a promise

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

#### XMLHttpRequest Synchronous

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

#### Async/Await

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

## __proto__ & Prototype
The prototype system is what the `class` keyword is built on top of

## Classes



### More on functions


<hr>

