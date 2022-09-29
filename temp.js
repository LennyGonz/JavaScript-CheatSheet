function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = {
  name: "Kyle",
};

var you = {
  name: "Reader",
};

console.log(identify.call(me)); // KYLE
console.log(identify.call(you)); // READER
console.log("---------");
console.log(speak.call(me)); // Hello, I'm KYLE
console.log(speak.call(you)); // Hello, I'm READER
