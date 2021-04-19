function greet(greeting, name){
  return `${greeting}, ${name}`
}

function curryGreet(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`
  }
};

const greetItal = curryGreet("Ciao");
greetItal("Alonzo"); // "Ciao, Alonzo"

const greetTex = curryGreet("Howdy");
greetTex("Alonzo"); // "Howdy, Alonzo"
greetTex("Alan"); // "Howdy, Alan"
