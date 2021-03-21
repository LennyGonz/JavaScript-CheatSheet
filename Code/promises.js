let p = new Promise((resolve, reject) => {
  let a = 1 + 1

  if (a == 2) {
    resolve('success')
  }
  else {
    reject('failure')
  }
})

function displayMessage(message) { console.log('this test was a major ' + message);}

p.then(displayMessage).catch((message) => {console.log("this test was a " + message)})
