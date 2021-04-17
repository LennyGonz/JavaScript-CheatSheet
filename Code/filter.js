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

odds = filter(n => {
  return !isEven(n);
}, wholes)

[1,3,5,7,9]

greaterThanFour = filter(n => n > 4, wholes)

function isPrime(n) {
  if (n <= 1) return false;
  const wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const possibleFactors = filter(m => m > 1 && m < n, wholes);
  const factors = filter(m => n % m === 0, possibleFactors);
  return factors.length === 0 ? true : false;
}
