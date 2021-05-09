const Box = x =>
({
  map: f => Box(f(x)),
  inspect: () => `Box({x})`
})

const nextCharForNumberString = str =>
  Box(str)
  .map(s => s.trim())
  .map(r => parseInt(r))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))

const result = nextCharForNumberString('  64') // { map: ƒ map(), inspect: ƒ inspect() }
console.log(result)

const moneyToFloat_ = str =>
  parseFloat(str.replace(/\$/g, ''))

const percentToFloat_ = str => {
  const replaced = str.replace(/\%/g, '')
  const number = parseFloat(replaced)
  return number * 0.01
}

const applyDiscount_ = (price, discount) => {
  const cost = moneyToFloat_(price)
  const savings = percentToFloat_(discount)
  return cost - cost * savings
}

const result = applyDiscount_('$5.00', '20%')
console.log(result)

// Going to refactor above
const moneyToFloat = str =>
  Box(str)
    .map(str => str.replace(/\$/g, ''))
    .map(res => parseFloat(res)) // changed from fold to map to keep res in box

const percentToFloat = str =>
  Box(str)
    .map(str => str.replace(/\%/g, ''))
    .map(num => parseFloat(num))
    .map(res => res * 0.01) // we changed this from fold -> map b/c we want to keep the result in the box

/**
  * We could have also done it like this
  * const percentToFloat = str =>
      Box(str.replace(/\%/g, ''))
      .map(replaced => parseFloat(replaced))
      .fold(res => res * 0.01)
*/

// This is the challenging because we have 2 assignments being used at once
// By tweaking moneyToFloat & percentToFloat to not use fold the results always stay in the box
// Which is why we don't use Box here
// And we nest the map functions, its bc we captured 'cost' in a closure to REUSE the result of
// moneyToFloat(price) when we do 'map(cost => percentToFloat(discount)'
const applyDiscount = (price, discount) =>
  moneyToFloat(price)
    .fold(cost => percentToFloat(discount)
      .fold(savings => cost - cost * savings))

// the 2 fold were previously map, but we had to change it because then we'll have a Box within a Box -> Box(Box())
// So to get our result out, we simply fold twice
const result2 = applyDiscount('$5.00', '20%')
console.log(result2);

// Still confused about box?
/**
 * Box alone doesn't do much
 * It basically captures something in a context
 * And we can keep mapping, and folding and composing in different ways aronud it.
 * 
 * There are also things stronger than Box that will give us behaviors associated with composition and give us new ways to compose functions
 */

const Right = x =>
({
  map: f => Right(f(x)),
  inpect: () => `Right(${x})`,
  fold: (f, g) => g(x),
  chain: f => f(x)
})

const rez = Right(3).map(x => x + 1).map(x => x / 2)

const Left = x =>
({
  map: f => Left(x),
  chain: f => Left(x),
  inspect: () => `Left(${x})`,
  fold: (f, g) => f(x)
})

// Notice that in Left, it will not run the f on the x -> f(x)

const rezy = Left(3).map(x => x + 1).map(x => x / 2)

const fromNullable = x =>
  x != null ? Right(x) : Left(x)

const fs = require('fs')

const getPort_ = () => {
  try {
    const str = fs.readFileSync('../JSON/config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 3000
  }
}

tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const getPort__ = config =>
  tryCatch(() => fs.readFileSync('../JSON/config.json'))
    .fold(contents => tryCatch(() => JSON.parse(contents)))
    .fold(() => 3000, x => x)

// If the config.json does not exist, this will blow up and it isn't ready to catch that error, so we add another tryCatch to be ready for a scenario where config.json doesn't exist
// However by doing that we nest Box objects so we need to fold twice instead of using map
// To fix this we add another function called chain

const getPort__ = config =>
  tryCatch(() => fs.readFileSync('../JSON/config.json'))
    .chain(contents => tryCatch(() => JSON.parse(contents)))
    .fold(() => 3000, x => x)

// so isnt chaining and folding the same thing sometimes?
// well fold - removes a value from its context, taking it out of the box
// chain expects you to run a function and return another one
// Even though they have the same definition, they have different functions

const Sum = x =>
({
  x,
  concat: ({ x: y }) => Sum(x + y)
})

Sum.empty = () => Sum(0)

const Product = x =>
({
  x,
  concat: ({x : y}) => Product(x * y)
})

Product.empty = () => Product(1)

const Any = x =>
({
  x,
  concat: ({ x: y }) => Any(x || y)
})

Any.empty = () => Any(false)

const All = x =>
({
  x,
  concat: ({ x: y }) => All(x && y)
})

All.empty = () => All(true)

const Max = x =>
({
  x,
  concat: ({x : y}) => Max(x > y ? x : y)
})

Max.empty = () => Max(-Infinity)

const Min = x =>
({
  x,
  concat: ({x : y}) => Max(x < y ? x : y)
})

Min.empty = () => Min(Infinity)

const Right_ = x =>
({
  fold: (f, g) => g(x),
  map: f => Right(f(x)),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r)))
})

const Left_ = x =>
({
  fold: (f, g) => f(x),
  map: f => Left(x),
  concat: f => Left(x)
})

const stats = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Blog', views: 4}
)

stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)))

const First = either =>
({
  fold: f => f(either),
  concat: o => either.isLeft ? o : First(either)
})

First.empty = () => First(Left())

const find = (xs, f) =>
  List(xs)
    .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x)

find([3, 4, 5, 6, 7], x => x > 4)

const Fn = f =>
({
  fold: f,
  concat: o => Fn(x => f(x).concat(o.fold(x)))
})

const hasVowels = x => !!x.match(/[aeiou]/ig)
const longWord = x => x.length >= 5

const both = Fn(compose(All), hasVowels).concat(Fn(compose(All, longWord)))

['gym', 'bird', 'lilac'].filter(x => both.fold(x).x)
// lilac

const Pair = (x, y) =>
({
  x,
  y,
  concat: ({x: x1, y: y1}) => Pair(x.concat(x1), y.concat(y1))
})
