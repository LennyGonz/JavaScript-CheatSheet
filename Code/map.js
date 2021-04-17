// Concatenate two arrays into a new single array
function concat(array1, array2) {
  return array1.concat(array2);
}

// Return the number of items in an array
function length(array) {
  return array.length;
}

// Return the first item in an array
function head(array) {
  return array[0];
}

// Return the rest of an array after the first item
function tail(array) {
  return array.slice(1);
}

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

halved = map(n => n / 2, wholes) // [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]


fizzBuzz = map(n => {
  const fizzed = n % 3 === 0 ? 'fizz' : '';
  const buzzed = n % 5 === 0 ? 'buzz' : '';
  return fizzed || buzzed ? fizzed + buzzed : n;
}, wholes)
