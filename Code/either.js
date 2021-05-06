//import { readFileSync } from 'fs';
const fs = require('fs');
const config = require("../JSON/config.json");

const Right= x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`
})

const fromNullable = x => x != null ? Right(x) : Left()

const findColor = name => fromNullable({
  red: '#ff4444',
  blue: '#3b5998',
  yellow: '#fff68f'}[name]
)

const res = () =>
  findColor('red')
    .map(x => x.toUpperCase())
    .map(x => x.slice(1))
    .fold(
      () => 'no color!',
      color => color
  )

console.log("findColor Example:" + res())
  
// tryCatch, when called, if it blows up, I'll get a Left of the error and if it doesn't I'll get a right
const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const readFileSync = path =>
  tryCatch(() => fs.readFileSync(path))

const getPort = () =>
  readFileSync('../JSON/config.json')
    .map(contents => JSON.parse(contents))
    .map(config => config.port)
    .fold(() => 8080, x => x)

const getPort_ = () => {
  try {
    const str = readFileSync('../config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 5000
  }
}

const portex = getPort();
console.log("getPort Example: " + portex) // 3000
