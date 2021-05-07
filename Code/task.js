import { Task } from 'types';
const fs = require('fs')

Task.of(2).map(two => two + 1)// Task(2)

// rej, res are flipped because it's easier to catch the error, if there is one
const t1 = Task((rej, res) => res(2)
  .map(two => two + 1))
  .map(three => three * 2)

t1.fork(console.error, console.log)

const readFile = (path, enc) =>
  Task((rej, res) => fs.readFile(path, enc, (err, contents) =>
      err ? rej(err) : res(contents)
    )
  )

const writeFile = (path, contents) =>
  Task((rej, res) =>
    fs.writeFile(path, contents, (err, contents) =>
      err ? rej(err) : res(contents)
    )
  )

const app = () =>
  readFile('config.json', 'utf-8') // Task(contents)
    .map(contents => contents.replace(/3/g, '6'))
    .chain(newContents => writeFile('config1.json', newContents))

app().fork(console.error, () => console.log('success!'))

const app_ = () =>
  fs.readFile('config.json', 'utf-8', (err, contents) => {
    console.log(err, contents)
    if (err) throw err

    const newContents = contents.replace(/3/g, '6')

    fs.writeFile('config1.json', newContents, (err, _) => {
      if (err) throw err
      console.log('success')
    })
  })
