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

#### 4.3.1 `this`

Lexical `this` capabilities of arrow functions

<p align="center">

<image src="/Images/ArrowFunctions1.png">

</p>

Here `this` is correctly pointing to the workshop object
**This not implicit binding**, the behavior is actually called **lexical `this` behavior**

Lexical `this`: many people think that an arrow function is essentially a hardbound function to the parent's `this` ... this is **not** accurate <br>
The proper way to think of what an arrow function is → **an arrow function does not define the `this` keyword at all** <br>
There is no such thing as a `this` keyword in an arrow function, which means **IF** you put a `this` keyword inside an arrow function it's going to behave **like any other variable**
Therefore, it's going to lexically resolve to some enclosing scope that **does** define the `this` keyword

In the example above, when we say `this.` <br> There is no `this` in that arrow function **NO MATTER HOW IT GETS INVOKED** <br>
So we lexically go up one level of scope which is, the `ask()` function...
`this` goes out from the `callback`(the  arrow function) scope → to the enclosing scope → `ask()` <br>
AND `ask()`'s definition of the `this` keyword is determined by **HOW IT IS INVOKED**
How was it invoked? → `workshop.ask("Is this lexical this?");` <br> 
Through the object `workshop` → so `this` inside the arrow function determines what is pointing to by how `ask()` gets invoked.

So it resolves lexically, meaning if you had 5 nested arrow function it will go up 5 levels and keeps on going until it finds a function that defines a `this` keyword and whatever the `this` keyword points at for that function, that's what it uses.

The **spec sheet** for Arrow function says:

1. An arrow function does not defined local bindings for `arguments`, `super`, `this` or `new.target`. **Any reference to `arguments`, `super`, `this` or `new.target` within an arrow function must resolve to a binding in a lexically enclosing environment**
2. If you call `new` on an arrow function, you get an exception ... an error


<p align="center">

<image src="/Images/ArrowFunctions2.png">

</p>

We tend to think that `{}` curly braces are scopes, theyre blocks, theyre function bodies ... they must be scopes → **No!**

In this example, when `this` goes up one level to resolve what `this` is pointing to... it won't point to the workshop object! <br> 
Just because it has curly braces doesn't mean its a scope! <br> **Objects are not scopes!** <br> **Object properties are not scoped, properties are not lexical identifiers**

**You have to think about an arrow function as not having a `this` and resolving it lexically!** 
So what is the parents scope!? There are only 2 scopes in the function above!
1) ask() - but its an arrow function
2) global scope 
So `this` points to the global scope, and will therefore return `undefined`

**Nonetheless,** the lexical behavior of arrow functions is a much better way of defining `this` rather than `var self = this` or even doing `function.bind()` <br>
Because when you use arrow functions, you want the `this` to behave lexically, rather than having the arrow function having some magical `this` behavior.

Bottom Line: We want it to just adopt the `this` keyword of some parent scope.

Cannot stress this enough: **Only use arrow functions when you need lexical `this`**


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
    console.log(`${this.teacher}, ${question}?`)
  }
}

class AnotherWorkshop extends Workshop{
  speakUp(msg){
    this.ask(msg)
  }
}

var JSRecentParts = new AnotherWorkshop("Will")

JSRecentParts.speakUp("Are classes getting better");
// Will, Are classes getting better?
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

You can refer to the parent from the child by saying `super.` → in our example we did `super.ask(msg.UpperCase())`


## `this`

The problem with `this` is it's a common pronoun, so it can be very difficult, especially verbally, to determine whether we're using "this" as a pronoun or using it to refer to the actual keyword identifier.

The **first** common temptation is to assume `this` refers to the function itself
But why would you want to refer to a function from inside itself ?
The most common reasons would be things like **recursion** or having an event handler that can unbind itself when it's first called

Referencing the function as an object (all functions in JavaScript are objects!) lets you store state between function calls

Example of using `this` incorrectly - referencing the function itself:

```python
function foo(num) {
  console.log("foo: " + num);
}

foo.count = 0;

var i;

for (i=0; i < 10; i++) {
  if (i > 5) {
    foo(i)
  }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called ?
console.log(foo.count); // 0 -- WTF?
```

`foo.count` is still 0, even though the four `console.log` statements clearly indicate `foo(...)` was in fact called four times

> The frustration stems from a *too literal* interpretation of what `this` (in `this.count++`) means.

When the code executes `foo.count = 0`, indeed it's adding a property `count` to the fnuction object `foo`
But for the `this.count` reference inside of the function, `this` is not in fact pointing *at all* to that function object, and so even though the property names are the same, the root objects are different, and confusion ensues

However, we clearly were incrementing a `count` property but it wasn't the one I expected. Which `count` was I incrementing ?
We accidentally created a global variable `count` and it currently has the value `NaN` (not a number)

```python
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting = "Hello, I'm " + identify(context);
  console.log(greeting)
}

identify(you); // READER
speak(me); // Hello, I'm KYLE
```

 ```python
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
}

var me = {
  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me) // Hello, I'm KYLE
speak.call(you) // Hello, I'm READER
```

To reference a function object from inside itself, `this` by itself will typically be insufficient
You generally need a reference to the function object via a lexical identifier (variable) that points at it

To make `this` work, we need to **force** `this` to actually point at the `foo` function object:

```js
function foo(num) {
  console.log("foo: " + num)

  // keep track of how many times `foo` is called
  // Note: `this` IS actually `foo` now, based on
  // how `foo` is called
  this.count++
}

foo.count = 0;

var i;

for (i=0; i<10, i++) {
  if (i > 5) {
    // using `call(..)` we ensure the `this`
    // points at the function object (`foo`) itself
    foo.call(foo, i)
  }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log(foo.count); // 4
```

We **force** `this` to point to `foo` by using `call`

The syntax of the `call()` method is:
`func.call(thisArg, arg1, ..., argN)`

- `thisArg`: The `thisArg` is the object that the `this` object references inside of the function `func`
- `arg1, ... argN` **(optional)**: Arguments for the function `func`

By **default**, in a function `this` refers to the global object i.e, window in web browsers and `global` in node.js

<hr>

The 2nd common misconception about the meaning of `this`, is that it somehow refers to the function's scope
Because in one sense there is some truth, but in the other sense, it's quite misguided

To be clear, `this` **does not**, in any way, refer to a function's **lexical scope**.
Internally, scope is kind of like an object with properties **BUT** the scope object is **not** accessible to JavaScript code

This is what it looks like to attempt and fail to cross over the boundary and use `this` to implicitly refer to a function's lexical scope:

```js
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log( this. a)
}

foo(); // ReferenceError: a is not defined
```

Firstly, an attempt is made to reference the `bar()` function via `this.bar()`
It is almost certainly an *accident* that it works
The most natural way to have invoked `bar()` would have been to omit the leading `this` and just make a lexical reference to the identifier

However, you cannot use `this` to create a bridge between the lexical scope of `foo()` and `bar()` so that `bar()` has access to the variable `a` in the inner scope of `foo()`.
**No such bridge is possible** - You cannot use a `this` reference to look something up in a lexical scope. **It's not possible**

<hr>

## What's `this` ?

`this` is a runtime binding - it is contextual based on the conditions of the function's invocation
`this` binding has nothing to do with **WHERE** a function is declared, but has instead **everything** to do with the manner in which the function is called

When a function is invoked an execution context is created
This record contains information about where the function was called from (the call-stack)
*how* the function was invoked, what parameters were passed, etc.
One of the properties of `this` records is the `this` reference which will be used for the duration of that function's execution

<hr>

## Summary

`this` binding is a constant source of confusion for the JavaScript developer who does not take the time to learn how the mechanism actually works. 
Guesses, trial-and-error, and blind copy-n-paste from Stack Overflow answers is not an effective or proper way to leverage this important this mechanism.

To learn `this`, you first have to learn what `this` is *not*, despite any assumptions or misconceptions that may lead you down those paths. this is neither a reference to the function itself, nor is it a reference to the function's *lexical* scope.

`this` is actually a binding that is made when a function is invoked, and *what* it references is determined entirely by the call-site where the function is called.
