function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;

  return newUser;
}

const userFunctionStore = {
  increment: function () {
    const add1 = () => {
      this.score++;
    };
    add1();
  },
};

const user1 = userCreator("Will", 3);
const user2 = userCreator("tim", 5);

console.log(user1.name);
console.log(user1.score);
user1.increment();
console.log(user1.score);
