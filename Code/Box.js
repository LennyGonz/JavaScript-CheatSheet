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
  fold: f => f(x)
})

const rez = Right(3).map(x => x + 1).map(x => x / 2)

const Left = x =>
({
  map: f => Left(x),
  inspect: () => `Left(${x})`
})

// Notice that in Left, it will not run the f on the x -> f(x)

const rezy = Left(3).map(x => x + 1).map(x => x / 2)

// 
