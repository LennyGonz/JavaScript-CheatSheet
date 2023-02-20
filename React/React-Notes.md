# React Notes

With React, there is no worry about keeping the state (held in JavaScript) and the UI (in the DOM) in sync.

With React, code is written that describes what the UI *should be* based on the application state.
React will be able to figure out what's changed, and will update the UI accordingly.


## Hello React

Starting with 2 files: an `index.html` file that includes a barebones HTML document, and an `index.js` file with a **minimal** React application.

```html
<html>
<body>
  <div id="root"></div>
</body>
</html>
```

```js
// 1. Import dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';

// 2. Create a React element
const element = React.createElement(
  'p',
  { id: 'hello' },
  'Hello World!'
);

// 3. Render the application
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);
```

When this code is run, there will be a paragraph that displays the text: "Hello World!".

There's a lot to unpack, so going through the 3 sections we'll see that it's not bad.

### Import dependencies

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
```

This is just 2 import statements.
Importing the core React library from the `react` dependency
Importing the `createRoot` function from `react-dom`.

There are 2 seperate packages because React is **platform agnostic**. The core `react` package manages all of the magic we need to create DOM nodes
However, there are different platforms like web, mobiles, and 3D scenes and so there are different platform-specific renderers:

1. `react-dom` for the web
   - Every platform has its own primitives. On the web, the primitives are our HTML elements like `<div>` and `<p>` and `<button>`. 
2. `react-native` for mobile (iOS / Android) or desktop (Windows / MacOS) applications.
   - By contrast, React Native doesn't have `divs`, it has `Text` and `View` and `Pressable`.
3. `react-three-fiber` for 3D scenes using WebGL and Three.js
   - And things get even more wild with react-three-fiber, where the primitives are based on shapes and textures.

All of these platforms will use the same core framework, which comes from the react package.

> **What is the DOM ?**
> The Document Object Model (DOM) is a programming interface for web documents.
> It represents the page so that programs can change the document structure, style, and content.
> The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.
> 
> <hr>
>
> When you **right-click** and **View source**, you view the the HTML, a static document that describes what will be constructed.
> When you **right-click** and **Inspect element**, to open the *Elements* pane, you're interacting with the DOM. You can change attributes and watch the UI update in response.

When we use a tool like React, it works by interacting with the DOM via JavaScript. It'll create, update, and delete DOM elements as required.

### Create a React Element

```js
const element = React.createElement(
  'p',
  { id: 'hello' },
  'Hello World!'
);
```

`React.createElement` is a function that accepts 3 or more arguments:

1. The type of the element to create.
2. The properties we want this element to have.
3. The element's contents, what the element should have as children.

This function returns a 'React Element'.
React elements are plain old JavaScript objects.
If we inspect it with `console.log(element)`, we'll see something like:

```js
{
  type: "p",
  key: null,
  ref: null,
  props: {
    id: 'hello',
    children: 'Hello World!',
  },
  _owner: null,
  _store: { validated: false }
}
```

This JavaScript object is a description of a hypothetical paragraph tag, with an ID of `hello`, containing the text `"Hello World!"`.
This information will be used to construct the *actual* paragraph we can see in-browser.

The final two properties, `_owner` and `_store`, are **meant** to be used internally by React.

### Render the application

```js
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);
```

`document.querySelector` is a helpful function that lets us capture a reference to a pre-existing DOM element.
It's the modern version of `document.getElementById`, if you're more familiar with that function...

It works in this case because our index.html file includes the following element:

```html
<div id="root"></div>
```

**This element will be our application's container**. When we render our React application, it will create and append new DOM element(s) to this container.

With `react-dom`'s `createRoot` function, we specify that this element should be the root of our application. And, finally, we render the application with `root.render(element)`.

You can think of the `render` function as a machine that **converts React elements into DOM nodes**.

In this case, our React element describes a paragraph tag, with an ID, and some text inside. `render` will turn that description into the following DOM structure:

```html
<p id="hello">
  Hello World!
</p>
```

With that DOM element created, it then adds it to the page at the specified root.
In essence, this code takes a JavaScript-based description of some HTML, and uses it to produce real-world DOM nodes.

> **Things changed recently!**
> **`render`** used to work like:
> ```html
> import ReactDOM from 'react-dom';
> 
> ReactDOM.render(
>   element,
>   container
> );
> ```
> In version 18 (released in March 2022), the API was changed to the createRoot and render combo, which is what was used above.

### Challenge 1

In this exercise, you'll create a render function that takes React elements and produces the equivalent DOM structure!
We'll write a render function that accepts a React element and a reference to a DOM container element that will hold our application.

> To keep things as simple as possible, we won't bother with the createRoot API

We are given:

```js
function render(reactElement, containerDOMElement) {
  /* Your code here! */
}

const reactElement = { // line #177
  type: 'a',
  props: {
    href: 'https://wikipedia.org/', // line #180
  },
  children: 'Read more on Wikipedia',
}; // line #183

const containerDOMElement =
  document.querySelector('#root');

render(reactElement, containerDOMElement);
```

On lines 177-183 we have this React element, which is a JavaScript object that describes a hypothetical anchor tag that links to the Wikipedia homepage, and has the text 'Read more on Wikipedia'

And we have to **write a function** that takes that element, and a place to put it and turns it into reality. Realizes this DOM element.

It's helpful to enumerate the steps we need to take so

1. I know that I need to create a DOM element, the actual anchor tag. Then ...
2. I need to update it with all of the different properties, in this case there is the href on line 180 and the text inside (line 182)
3. Finally, the element needs to go into the container. The element we've created **needs** to be appended to the container (`containerDOMElement`) so that it actually shows up in the DOM

For step 1, we need to do DOM operations. Specifically we need to know how to create and append nodes. For creating nodes `document.createElement()` is used.
`createElement` requires 1 argument, need to specify the element we're trying to create. Based on the challenge an anchor tag is needed so passing `'a'` should suffice. However, the render function should be generic and handle any type of different React Elements. So instead of specifically creating an anchor tag, we pass `reactElement.type` to the createElement function.

Step 2 can be put on the back burner for now, because I want to get this element on the screen as soon as possible. Currently, I've created an Element, a DOM Node, but the node hasn't been attached anywhere. So we need to append it using the function: `appendChild`. We can do containerDOMElement.appendChild(domElement). Nothing will show up on the screen, but if the page is inspected within the nested tags there will be an empty anchor tag. So I'm on the right path, but in order to see the text and other attributes we must apply them onto the element

Step 3, is really step 2: update properties. This action can be called "editing nodes", we want to apply the text onto our element as well as apply the href. And this can be done very directly:

```js
// domElement is a DOM Node and therefore comes with member functions such as innerText and setAttribute
domElement.innerText = reactElement.children;
domElement.setAttribute('href', reactElement.props.href);
// then when I pass the values it's simple. I'm just indexing an object. ReactElement is the object->look inside the props property and pass the href value
```

However, this isn't general enough. The function should be able to accept any object which can have different structures and property names so it's better to use iteration.

```js
for (const key in reactElement.props) {
  const value = reactElement.props[key] // we'll be accessing all the nested properties in props and assigning those values to the const variable: value
  // in this example props only has 1 inner property: href AND value holds the wiki link
  // so we continue to use the setAttribute function, but now its generalized. We set the key/value pair together
  domElement.setAttribute(key, value);
}
```

Now if the page is inspected once again, every objective is completed. 
But more importantly we can see that the magic React performs under the hood is not as complicated as imagined. 
And while this is a very basic example, fundamentally React takes object descriptions of DOM elements, like `reactElement`, and it produces the real thing.

In the past people have used the phrase "virtual DOM" to describe how React works, because essentially you wind up with these JavaScript objects that describe a whole bunch of DOM, and React-DOM takes those descriptions(`reactElement`) and mirrors them into the real DOM.

Fundamentally, React-DOM is **like** a translator that takes the descriptions we produce in JavaScript and produces and realizes the real version of them.
It's able to do this using all the same methods used in the solution above: `document.createElement`, `setAttribute`, and `appendChild`.
> As things change in the DOM, react will use whichever method is most appropriate to convey those changes.
> This is the core of React, React is a javascript framework and it exists **in JavaScript**. For all the smoke and mirrors and all of the advanced stuff that it does, fundamentally it uses the exact same methods I would use if writing vanilla javascript.

## Understanding JSX

Before we were creating React Elements using plain, everyday JavaScript

In reality this is not how it's done, it's much more common to use a specialized syntax called JSX.

```html
<html>
<body>
  <div id="root"></div>
</body>
</html>
```

```js
import React from 'react';
import { createRoot } from 'react-dom/client';

//// Old way:
// const element = React.createElement(
//   'p',
//   {
//     id: 'hello',
//   },
//   'Hello World!'
// );

// New way:
const element = (
  <p id="hello">
    Hello World!
  </p>
);

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);

// It may seem like we're not using the React dependency... but we are. It's just hidden by the JSX
// the const element will eventually become -> React.createElment(...)
```

Instead of writing `React.createElement`, we use an HTML-like syntax to create React elements.

**Why do we use JSX?** Because it's much easier to read.

React elements can form a tree structure, just like HTML elements and if JSX wasn't used react code would be very illegible.

However, JSX needs to be compiled. Attempting to run JSX code in the browser will result in an error.
JavaScript engines don't understand JSX, they **only** understand JavaScript. And so we need to "compile" our code into plain JS.

> This is most commonly done as part of a build step, using a tool like Babel

The important concept to understand is the JSX code we write will get converted into `React.createElement`.
By the time the code is running in the user's brwoser, all of the JSX has been zapped out, and all that's left is a JS file full of nested `React.createElement` calls. 

> "transpiled" vs "compiled"
> The process of converting JSX into browser-friendly JS is sometimes referred to as "transpiling" instead of "compiling".
> **There's a difference!** Transpiling refers to taking one high-level language and transforming it into another high-level language.
> Compiling refers to the process of taking human-readable code and transforming it into machine-readable code.

### Expression Slots

Expression slots allow us to inject JavaScript Code directly into the JSX

```js
import React from 'react';
import { render } from 'react-dom';

const shoppingList = ['apple', 'banana', 'carrot'];

const element = (
  <div>
    Items left to purchase: {shoppingList.length}
  </div>
);

// the plain JS equivalent of the JSX above
const compiledElement = React.createElement(
  'div',
  {},
  'Items left to purchase: ',
  if (shoppingList.lenth < 5) "Almost done!"
)

const root = document.querySelector('#root');

render(compiledElement, root);
```

We can create *expression slots* with curly brackets (`{}`). Anything placed inbetween the curly brackets will be treated as pure JavaScript, instead of a string.
While it would be great to put conditionals inside of the `{}`, when we translate it to plain javascript we see the reality of what we're attempting to do.
You wouldn't put an `if`-statement in the middle of calling a function, so that's we cannot place conditionals inside the `{}`.

What this boils down to is understanding: statements vs expressions.

We're allowed to put expressions in our JSX, but we're **not allowed** to put **statements**!

**Expressions**: at its core, is a bit of JavaScript Code that **produces a value**.

For example:
`1` -> produces `1`
`"hello"` -> produces `"hello"`
`isHappy ? "🙂" : "🙁"` → produces an emoji

Expressions can contain expressions: `(5+1) * 2`
In this expression alone there are 5 expressions: `(5+1) * 2`, `(5 + 1)`, `5`, `1`, `2` 

**Statements**: at its core, is an instruction to the computer to do a particular thing

For example:
`let hi = 5;`
`if (hi > 10) { ... }`
`throw new Error('Something exploded!');`

Statements are the rigid structure that holds our program together, while expressions fill in the details.
Statements often have "slots" for expressions. We can put any expression we like into those slots.

for example:
`let hi = /* some expression */`

Another trick to determine if you have an expression or statement is attempting to print it out.
`console.log(/* Some Chunk of JS here */);`

If it runs, the code is an expression. If you get an error, it's a statement (or possibly, invalid JS).
This works because **All function arguments must be expressions**, expressions produce a value and that value will be passed into the function
Statements **do not produce a value**, and so they can't be used as function arguments.

<hr>

The expression slots come in handy for many reasons

#### Adding comments in JSX:
```js
const element = (
  <div>
    {/* Some comment! */}
  </div>
);
```

We specifically need to use the multi-line comment syntax (`/* */`) instead of the single-line syntax (`//`).
This is because the single-line syntax comments everything out, including the closing `}` for the expression slot!

#### Attribute expression slots

```js
const someIdentifier = 'some-unique-identifier';                            const element = React.createElement(
                                                                              'div',
const element = (                                                             {
  <div id={someIdentifier}>                    -> here's how it compiles ->     id: someIdentifier
    Hello World                                                               },
  </div>                                                                      'Hello Word'
);                                                                            );
```

Adding dynamic attribute values

### Differences from HTML

JSX looks like HTML, but there are some fundamental differences.

for example in HTML we can have `<label for="name"> Name: </label>`
but in JavaScript `for` is a keyword so what we do instead is
`<label htmlFor="name"> Name: </label>`

Another common fix is in html we use `class` but that's also a reserved keyword in JavaScript, therefore we use `className` in JSX.

JSX is also **case-sensitive**. The JSX compiler uses the tag's case to tell whether it's a primitive (part of the DOM) or a custom component.
Attributes need to be camelCase -> `<video> src="..." autoplay={true}>` -> in JSX we do: `const element = <video src="..." autoPlay={true} />`
There's also onclick -> onClick. There's a whole table with the conversions you might need.

Inline styling also needs to be as so: `<h1 style={{ fontSize: '2rem' }}> ... </h1>`

### The Whitespace Gotcha

We have a code snippet:

```jsx
import { createRoot } from 'react-dom/client';

const daysUntilSantaReturns = 123;

const element = (
  <div>
    <strong>
      Days until Santa returns:
    </strong>
    {daysUntilSantaReturns}
  </div>
);

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);
```

it'll display: `Days until Santa returns:123` instead of `Days until Santa returns: 123` 

Remember **JSX doesn't compile to HTML, it compiles to JavaScript**
And when JavaScript is executed, it's only going to create an append two HTML nodes:

- a `<strong>` tag with some text
- a text node, for the number `123`

To add the extra whitespace we can simply do:

```js
<div>
  <strong>Days until Santa returns:</strong>
  {' '}
  {daysUntilSantaReturns}
</div>
```

On the web, whitespace serves two different purposes:

1. It creates grammatical space characters between words in sentences
2. It serves as indentation, to improve code readability for developers

Any tool that processes HTML or JSX will need to figure out how to interpret every single whitespace character. Should it be a space, or is it indentation?

In HTML, every whitespace character (along with newline characters!) will produce a single visible space. In some cases, this works to our advantage, but in other circumstances, it gets in the way.

The JSX trick of adding `{' '}`, therefore, may not be as hacky as it feels. It's a way of us to **signify to the compiler** that a whitespace character is meant to be a grammatical space, and isn't indentation.

### Exercises

Build an inline search form, the styling was given.

Only need to add 3 elements right inside of the `<form>` tag:

1. A label
2. A text input
3. A button, with the class `submit-btn`

```js
import React from 'react';
import { createRoot } from 'react-dom/client';

const element = (
  <form>
    <label htmlFor="search-input"> Search: </ label>
    <input id="search-input" />
    <button className="submit-btn"> Submit </ button>
  </form>
);

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);
```

Build a Twitter/Animal-Crossing hybrid. A social network for animals called Critter.
Specifically, implement the view for a single message.

Given 2 things:

1. A `message`object, containing all the data you'll need to populate the UI
2. A bunch of styles, so you don't have to worry about any of the CSS

```js
import React from 'react';
import { createRoot } from 'react-dom/client';

const message = {
  content:
    'Just ate at “Les Corbeaux En Colère”. Wonderful little venue!',
  published: 'January 21st at 9:45pm',
  author: {
    avatarSrc: 'https://josh-bundler.com/img/avatars/009.png',
    avatarDescription: 'Cartoon bear',
    name: 'Ben Thorn',
    handle: 'benjaminthorn',
  }
};

const element = (
  <article>
	<header>
      <img src={message.author.avatarSrc}
           alt={message.author.avatarDescription}
      />
      {/* template literals -> combining string and variables */}
      <a href={`/users/${message.author.handle}`}>{message.author.name}</a>
    </ header>

    <p>
      {message.content}
    </ p>

    <footer>
      Posted {message.published}
    </ footer>
  </article>
);

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(element);
```



## Components

React is a component based framework.

What is a component, exactly?
A component is a bundle of markup, styles, and logic that controls everything about a specific part of the user interface.

It's a different mental model when it comes to code organization.
Instead of separating our application into markup (written in HTML), styles (written in CSS), and logic (written in JS), we organize our application into components.

In JavaScript, the mechanism of reuse is the function. Maybe we have a function to process data in some way:

```js
function shout(sentence) {
  return sentence.toUpperCase() + '!!';
}

shout("we're off to see the wizard")
// -> "WE'RE OFF TO SEE THE WIZARD!!"
```

**With React, components are the main mechanism of reuse**. Instead of partials for HTML, classes for CSS, and functions for JavaScript, we create a component that bundles up all 3, and allows us to create a library of high-level reusable UI elements.

This idea is really very powerful. It takes a while to get accustomed to thinking in components, but once you do, you'll never want to work on a project without them.

(Modern React also features hooks, which offers a way to reuse React logic! We'll learn all about them in the modules ahead.)

### Basic Syntax

Here's an example of a JS function:

```js
import React from 'react';
import { createRoot } from 'react-dom/client';

function FriendlyGreeting() {
  return (
    <p
      style={{
        fontSize: '1.25rem',
        textAlign: 'center',
        color: 'sienna',
      }}
    >
      Greetings, weary traveller!
    </p>
  );
}

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<FriendlyGreeting />);
```

In React, components can be defined as JavaScript functions.
Typically, React components return one or more React elements.
In this example, `FriendlyGreeting`, creates a React element that describes a paragraph, with some built-in styles.

And finally, we render this component **just like** how HTML tags are rendered.
Instead of rendering a `<div>` or an `<h1>`, `<FriendlyGreeting>` is rendered.

Components **must** always start with a **Capital Letter**. This is due to how JSX is transformed into JS.

Here are 2 React elements in JSX:

```js
const elem1 = <h1>Hello!</h1>
const elem2 = <FriendlyGreeting />
```

... Those same elements, compiled into JavaScript

```js
const elem1 = React.createElement('h1', null, 'Hello!');
const elem2 = React.createElement(FriendlyGreeting, null);
```

**A React element is a description of a thing we want to create**. In some cases we want to create a DOM node.
In other cases, we want to create a *component instance*.

The first argument that we pass to `React.createElement` is the **“type”** of the thing we want to create.
For the first element, it's a string (`"h1"`).
For the second element, it's a **function**! It's `FriendlyGreeting`, and not `"FriendlyGreeting"`.

If our component had a lower-case function name, React would render a `<friendlygreeting>` HTML element, instead of processing it as a component.

#### Arrow functions vs traditional functions

Modern JavaScript supports two different syntaxes for writing functions.
In addition, to the traditional way, using the `function` keyword, you can also use "arrow functions"

When it comes to defining React Components either syntax works. But there are some functional limitations when it comes to arrow functions.

Arrow functions:

- do **not** have their own `this` value
- are **not** constructor-friendly
- are **not** hoisted

However, these limitations apply when it comes to making React components the conventional way.

Arrow functions are inspired by lamdba functions from other functional programming languages.
Their **main** benefit is that they're much shorter and cleaner.
Reducing "function clutter" may seem like an insignificant benefit, but it can really help improve readability when working with anonymous functions. For example:

```js
const arr = ['hey', 'ho', 'let\'s go'];

// This:
arr
  .map(function(string) {
    return string + '!'
  })
  .join(' ');

// …Becomes this:
arr
  .map(string => string + '!')
  .join(' ');
```

Arrow functions do have rules... there's a "short-form" and a "long-form"

short form: `const add1 = n => n + 1;`

long form:

```js
const add1 = n => {
  return n + 1;
};
```

Opting into the long form by adding curly braces (`{ }`) around the function body.
The fundamental difference between the two forms is this:

- The short-form function's body **must be a single expression**. That expression will be **automatically returned** or **implicitly returned**.
- The long-form function's body **can contain a number of statements** and therefore the return value must be explicitly stated.

*If you add a return keyword to the short-form syntax*, a syntax error will be thrown.
```js
const add1 = n => return n + 1;
// Uncaught SyntaxError: Unexpected token 'return'
```

There are also times when short-form syntax uses parenthesis instead of curly braces.

```js
const shout = sentence => (
  sentence.toUpperCase()
);
```

Parentheses can be added to help with formatting.
By adding parens, we're able to push the returned expression to a new line.
And so, we're still using the short-form “implicit” return structure, but we're restructuring it to make it more readable.

```js
// On multiple lines, with parens:
const shoutWithParens = sentence => (
  sentence.toUpperCase()
);

// Or, in a single line without parens:
const shoutWithoutParens = sentence => sentence.toUpperCase();
```

There are also `Optional parameter parentheses`: if an arrow function takes a single parameter, the parentheses are optional:

```js
// This is valid:
const logUser = user => {
  console.log(user);
}

// This is also valid:
const logUser = (user) => {
  console.log(user);
}
```

The parentheses are mandatory if we have more than 1 parameter:

```js
const updateUser = (user, properties, isAdmin) => {
  if (!isAdmin) {
    throw new Error('Not authorized')
  }

  user.setProperties(properties);
}
```

The parentheses are also mandatory if we have no parameters:

`const sayHello = () => console.log('Hello!')`

**Implicitly returning objects**, the function below returns an object:

```js
function makeObject() {
  return {
    hi: 5,
  };
}
```

When attempting to convert it to a short-form arrow function:

`const makeObject = () => {hi: 5};`

There are 2 ways to interpret this code:

- A short-form arrow function that returns an object, `{ hi: 5}`
- A long-form arrow function with a single statement, `hi: 5`

The problem is that curly braces (`{ }`) serve two purposes in JavaScript: they're used for object notation, **but** they're *also* used to create blocks, like in `if` statements.

When curly braces follow an arrow (`=>`), the JS engine assumes we're creating a new block, and so it'll throw a syntax error, since `hi:5` is not a valid JS statement.

**If** we want to implicitly return an object, we need to wrap it in parentheses: `const makeObject = () => ({ hi:5 });`

In JavaScript, parentheses can be added around **any** expression, to change its evaluation order.
In this case, we don't care about evaluation order, we just need to make it clear that we're trying to pass an expression.

Similarly, it's common to wrap the short-form expression in parentheses when it's too long to fit on a single line:

```js
const matchedItem = items.find(item => (
  item.color === 'red' && item.size === 'large'
));
```

We can wrap any expression in parentheses, but we can't wrap a block in parentheses.
And so, when we wrap the `{}` characters in parens, the engine can figure out that we're trying to create an object, not a block.

### Props

The `FriendlyGreeting` component is great, but it isn't terribly useful. Every time the component is rendered the exact same result is displayed. It's not flexible at all.

Components use **props**. Props are **like** arguments to a function: they allow us to pass data to our components, so that the components can include customizations based on the data. 

![props](../Images/props-transformation.png)

By adding props to the component, the component is now more flexible. We are able to pass data through props which is an object.

And with objects we can always destructure them to more easily grab the information we need.
That is how we go from `(props)` to `({ name})` in the function declaration.
Then in the function body we no longer need to prefix every property inside props with `prop.`, we just specify the key (`name`).

> When React renders, it'll collect all of the props into a props object. So, we can access the name value by specifying {props.name} in the JSX.
> with destructuring {name} is enough

And passing the information directly to the component is very similar to how we pass properties in html.

If we want to give `<div>` a class we simply do `<div class="hello">`

In JSX, we declare all the properties we need, so when we pass the component to be rendered we do a similar thing:
`<FriendlyGreeting name="Lenny">`.

Behind the scenes we have this:

```js
render(
  // <FriendlyGreeting name="Lenny" />
  React.createElement(
    FriendlyGreeting,
    {
      name: "Lenny"
    }
  )
  document.querySelector('#root')
);
```

When the application runs, if we were to inspect this element, we would see that we have an element of type `FriendlyGreeting` and we see there's a props object...
The props object/element, which is a bundle of information **about this particular element**, and we pass it to the render function.
React then figures out what it needs to render and with what necessary information...
For our example, React will see `FriendlyGreeting` component, **because it's a component**, it's a function. React needs to **call that function with the props that have been provided**. And that's how the argument is provided to the component.

We can also use default values. Suppose `FriendlyGreeting` is being worked on and we want to greet the user, but there's a problem. **We don't know everyone's name**. And instead of displaying an incomplete greeting we could do this with the `||` operator:

```js
function FriendlyGreeting({ name }) {
  return (
    <p>
      Hey {name || 'there'}!
    </p>
  )
}
```

If `name` is provided, it'll be used. Otherwise, we'll fall back and use "there".
This method works, but there's **an even better way** to do this in React. We can specify default values for **each** prop:

```js
function FriendlyGreeting({ name = 'there' }) {
  return (
    <p>
      Hey {name}
    </p>
  );
}
```

There are a couple of benefits to this approach:

- If we have multiple props with default values, we can see all of the defaults in the same place, rather than having them sprinkled around the component
- The `||` operator will occasionally surprise us by using the default value even when we've supplied a value! This can happen when the supplied value is falsy.

As a result, it's become a well-established convention to specify default values within the prop object.

### The Children prop

Let's suppose that we're building a custom *button* component.
It should look and act just like a regular HTML button, but with some additional styling.

```js
function RedButton({ contents }){
  return (
    <button
      style={{
        color: 'white',
        backgroundColor: 'red',
      }}
    >
      {contents}
    </button>
  );
}

// ... And then rendered like so:

root.render(
  <RedButton contents="Don't click me" />
);
```

This works... but it's quite different from how we use a typical HTML button, where the content goes in-between the open and close tags:

```js
<button>
  Don't click me
</button>
```

As a nice but of syntactic sugar, React lets us do the same thing with our custom components:

```js
root.render(
  <button>
    Don't click me
  </button>
);
```

When we do this, we can access the children through the `children` prop:

```js
function RedButton({ children }){
  return (
    <button
      style={{
        color: 'white',
        backgroundColor: 'red',
      }}
    >
      {children}
    </button>
  );
}
```

When we pass something between the open and close tags, React will automatically supply that value to us under `children`.

We can see this when we examine the React element produced:

![children-component](../Images/children-component.png)

`children` is a special value, a "reserved word" when it comes to props.

**But it's not THAT special**, `children` is not different from other props. They're exactly the same.

If we wanted to, we could pass `children` in the "traditional" way.
It's clunky, but the outcome is the same:

```js
// This element:
<div children="Hello world!" />

// …is equivalent to this one:
<div>
  Hello world!
</div>
```

If both "forms" of the children prop are passed:

```js
const element = (
  <div children="As an attribute">
    Between the brackets
  </div>
);
```

React chooses to priortize the content passed between the open/close tags, rather than the one written as an attribute.

**This is the only difference**.
The only thing that makes children special is that I can choose to pass it between the open/close tags.
In every other way, it's the same as any other prop.

### Exercises

Creating a new component, `ContactCard`, to reduce redundant code
![exercise-one](../Images/component-exercise.png)

Create a new component, `Button`, to create a more flexible button and reduce redundant code
![exercise-two](../Images/component-button-exercise.png)

## Application Structure



## Fragments



## Iteration



### Mapping Over Data



### Keys



### Exercises



## Conditional Rendering



### With an `If` Statement



### With `&&`



### With Ternary



### Showing and Hiding



### Exercies



## Range Utility



### Exercises



## Styling in React



### CSS Modules



### Exercises



