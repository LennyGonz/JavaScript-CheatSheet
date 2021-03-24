function userCreator(name, score) {
  this.name = name
  this.score = score
}

userCreator.prototype.increment = function() {
  const add1 = () => { this.score++;}
  add1()
}

userCreator.prototype.login = function() {
  console.log("this is my score: ", this.score)
}

const user1 = new userCreator('Eva', 9)
user1.login()
user1.increment()
user1.login()
