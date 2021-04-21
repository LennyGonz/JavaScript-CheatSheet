// If you have an array that hold values and maybe it's difficult to look for those values by its identity
// maybe theyre objects...

var arr = [{ a: 1 }, { a: 2 }];

arr.find(function match(v) {
  return v && v.a > 1;
}) // {a : 2}

// the .find function is similar to filter 
// youre returningg a true or false to say -> this is the thing i want you to return
// It's a way to provide a callback that allows you to do that searching in a more custom way than using the index method
// you cant find a value you get undefined

arr.find(function match(v) {
  return v && v.a > 10;
}) // undefined

arr.findIndex(function match(v) {
  return v & v.a > 10;
}) // -1

// Array.find and array,includes are good examples of helper methods that we normally would be bringing in from something like lodash or another utility library
// Another example of useful methods are: .flat() and .flatmap()

var nestedValues = [1, [2, 3], [[]], [4, [5]], 6];

nestedValues.flat(0);
// [1, [2, 3], [[]], [4, [5]], 6]; -> 0 levels of un-nesting

nestedValues.flat(/* default : 1 */);
// [1 , 2, 3, [[]], [4, [5]], 6] -> 1 level of un-nesting

nestedValues.flat(2);
// [1, 2, 3, 4, 5, 6] -> 2 levels of un-nesting

[1, 2, 3].map(function tuples(v) {
  return [v * 2, String(v * 2)];
});
// [ [2, "2"], [4, "4"], [6, "6"]]

[1, 2, 3].map(function tuples(v) {
  return [v * 2, String(v * 2)];
}).flat();
// [2 , "2", 4, "4", 6, "6"]

[1, 2, 3].flatMap(function all(v) {
  return [v * 2, String(v * 2)];
});
// [2 , "2", 4, "4", 6, "6"]

// We can also use flatmap to add/remove things to an array
[1, 2, 3, 4, 5, 6].flatMap(function doubleEvens(v) {
  if (v % 2 == 0) {
    return [v, v * 2];
  } else {
    return []
  }
});
// [2, 4, 4, 8, 6, 12]
