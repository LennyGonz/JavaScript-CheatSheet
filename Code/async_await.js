function getFile(file) {
  return new Promise(function (resolve) {
    fakeAjax(file, resolve)
  });
}

async function loadFiles(files) {
  // request all files concurrently
  // an array of promises
  var prs = files.map(getFile);

  // While this may be the instinctual approach - you can't use await in a regular function - throws syntax error
  // 
  // prs.forEach(function output(pr) {
  //   console.log(await pr)
  // })

  for (let pr of prs) {
    console.log(await pr)
  }
}

loadFiles(["file1", "file2", "file3"]);
