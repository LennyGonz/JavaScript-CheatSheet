let ender = (ending) => (input) => input + ending;

let adore = ender(" rocks");

let announce = ender(", y'all");

let exclaim = ender("!");

let hypeUp = (x) => exclaim(announce(adore(x)));
hypeUp("JS"); // "JS rocks, y'all!"
hypeUp("FP"); // "FP rocks, y'all!"
