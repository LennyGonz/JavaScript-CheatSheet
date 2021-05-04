const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: `Box(${x})`
})

const nextCharForNumberString_ = str => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = new Number(number + 1)

  return String.fromCharCode(nextNumber)
}

const nextCharForNumberString = str =>
  Box(str)
  .map(x => x.trim())
  .map(trimmed => parseInt(trimmed, 10))
  .map(number => new Number(number + 1))
  .fold(String.fromCharCode)

const result = nextCharForNumberString('    64');
console.log(result)

const first = xs => xs[0]

const halfTheFirstLargeNumber_ = xs => {
  const found = xs.filter(x => x >= 20)
  const answer = first(found) / 2;
  return `The answer is ${answer}`
}

const compose = (f, g) => x => Box(x).map(g).fold(f)

const halfTheFirstLargeNumber = xs =>
  Box(xs)
    .map(xs => xs.filter(x => x >= 20))
    .map(x => first(x) / 2)
    .fold(answer => `The answer is ${answer}`)

const res = halfTheFirstLargeNumber([1, 4, 50])
console.log(res)
