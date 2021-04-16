A Pure Function has two characteristics:

- No Side Effects: A pure function has no effect on the program or the world besides outputting its return value
- Deterministic: Given the same input values, a pure function will always return the same output. This is because its return value depends only on its input parameters, and not on any other information (e.g. global program state)

Here are examples of functions that may or may not be pure functions:

```js
function getDate(){
  return new Date().toDateString();
}
```
> This is not a pure function
> A function is not pure if its output depends on anything except its inputs (including the state of the world), or if calling the function at different times with the same inputs can give different outputs (e.g. if called on different days)

```js
function getWorkshopDate(){
  return new Date(2020,11,4).toDateString();
}
```
> This is a pure function
> A function is pure if its output depends on nothing but its input, and it always returns the same output if called with the same inputs (in this case, no inputs)

```js
function rgbToHex(R, G, B){
  return '#' + [toHex(R), toHex(G), toHex(B)].join('');
}
```
> This is a pure function
> A function is pure if its output depends on nothing but its inputs, it does nothing except return its output, and it always returns the same output if called with the same input

```js
function setColor(R, G, B){
  const hex = rgbToHex(R, G, B);
  const colorMe = document.getElementById('color-me');

  colorMe.setAttribute('style', 'color: ' + hex);
}
```
> This is not a pure function
> A function is not pure if it does anything besides return its output.
> Any other effect it has on the program or world is a side effect (in this case, changing the properties of an HTML element on the page)

```js
async function readJsonFile(filename){
  const file = await fetch(filename);

  return await file.json();
}
```
> This is not a pure function
> A function is not pure if its output depends on the state of the world (in this case, the contends of web-hosted file), or if calling the function at different times with the same inputs can give different outputs.
