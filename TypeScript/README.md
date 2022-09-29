# TypeScript

Typescript is an open source, **typed sntactic superset** of JavaScript

- compiles to readable JS
- Three parts: Language, Language Server, and Compiler
- Kind of like a fancy linter

Typescript allows developers to leave more of their "intent" on the page....

This kind of *intent* is often missing from JS code. For example:

```js
function add(a,b) {
  return a + b
}
```

Is this meant to take numbers as args ? strings ? both ?

What if someone who interpreted `a` and `b` as numbers made this "backwards-compitable change?"

```js
function add(a,b,c=0) {
  return a + b + c
}
```

We're headed for trouble if we decided to pass strings in for `a` and `b` !

Types make the author's intent more clear

```typescript
function add(a: number, b:number): number {
  return a + b;
}

add(3, "4") // There would be a red line with the message:
// Argument of type "string" is not assignable to parameter of type 'number'.
```

TypeScript has the potential to move some kinds of errors from **runtime** to **compile time**

- runtime errors effect users, so we could see these errors before even making a pull request

For example:

- Values that are potentially absent (`null` or `undefined`)
- incomplete refactoring
- breakage around *internal code* contracts (e.g. an argument becomes required) 

This is where all the work is being done: [Course website](https://www.typescript-training.com/course/fundamentals-v3/02-hello-typescript/)

whats the difference between a devDependency and a Dependency in package.json ?

if we have a line that uses `export`:
`export async function addNumbers(a,b){...}`

Node would complain - node wants common js modules!
Node JS module system predates a standardized JavaScript module
Even today node wants to run a common js module

So in the tsconfig file we need to add a `module` property to our compiler options

So it compiles differently in the node js world:
`export async function addNumbers(a,b){...}` turns into `exports.addNumbers = addNumbers...`

Sortying type systems as either static or dynamic has to do with whether type-checking is performed at **compile time** or **runtime**

In our case Typescript's type system is **static** just like Java, C#, and C++

Dynamic type systems perform their "type equivalence" evaluation at runtime
Javascript, python, ruby, perl, and php fall into this category
