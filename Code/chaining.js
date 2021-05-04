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


/* ================================================================================= */
// Straight from Codepen: https://codepen.io/drboolean/pen/poodxOm?editors=0010
/* ================================================================================= */

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: () => `Box(${x})`
})

// Exercise: Box
// Goal: Refactor each example using Box
// Keep these tests passing!
// Bonus points: no curly braces




// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
const moneyToFloat_ = str =>
  parseFloat(str.replace(/\$/, ''))

const moneyToFloat = str =>
	Box(str)
	.map(s => s.replace(/\$/, ''))
	.fold(s => parseFloat(s))


QUnit.test("Ex1: moneyToFloat", assert => {
  assert.equal(String(moneyToFloat('$5.00')), 5)
})

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
const percentToFloat_ = str => {
  const float = parseFloat(str.replace(/\%/, ''))
  return float * 0.0100
}

const percentToFloat = str => [
	Box(str)
	.map(s => s.replace(/\%/, ''))
	.map(s => parseFloat(s))
	.fold(s => s*0.0100)
]

QUnit.test("Ex2: percentToFloat", assert => {
  assert.equal(String(percentToFloat('20%')), 0.2)
})





// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
const applyDiscount_ = (price, discount) => {
  const cents = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cents - (cents * savings)
}

const applyDiscount = (price, discount) =>
	Box(moneyToFloat(price))
	.fold(cents =>
		Box(percentToFloat(discount))
		.fold(savings => cents - (cents * savings))
	)


QUnit.test("Ex3: Apply discount", assert => {
  assert.equal(String(applyDiscount('$5.00', '20%')), 4)
})
