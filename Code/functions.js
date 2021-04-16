function teacher() {
  console.log('function declaration')
}

const myTeacher = function anotherTeacher() {
  console.log(anotherTeacher)
}

console.log(teacher);
console.log(myTeacher);
// console.log(anotherTeacher); // reference error

var maestro = 'Will';

(function anotherTeacher(){
  var maestro = 'Lenny'
  console.log(maestro)
})();

console.log(maestro)
