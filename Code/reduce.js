const wholes = [0, 1, 2, 3, 4, 5];

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

function reduce(reducerFn, initialValue, array) {
  if (length(array) === 0) return initialValue;
  const newInitialValue = reducerFn(initialValue, head(array)); // this line calculates 1 value
  console.log("newInitialValue: " + newInitialValue);
  return reduce(reducerFn, newInitialValue, tail(array)); // this line will recursively call itself so we can get through the rest of the elements in the array
}

sum = reduce((accumulator, value) => { return accumulator + value;}, 0, wholes) // sum = 55

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

 max = reduce((acc, val) => { return val > acc ? val : acc }, 0, [7, 1, 3, 5, 6, 2, 8, 10, 0, 4, 9]) // returns 10
