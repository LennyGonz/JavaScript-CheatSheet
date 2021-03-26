// var teacher = "kyle";

// function ask(question) {
//   console.log(teacher, question);
// }

// function otherClass() {
//   var teacher = "Suzy";

//   ask("Why?");
// }

// otherClass();
function ask(question){
  console.log(this.teacher, question)
}

function otherClass() {
  var myContext = {
    teacher: "Suzy"
  }

  ask("Why?")
}

otherClass();
