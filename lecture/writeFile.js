const fs = require('fs').promises;


fs.writeFile('./lecture/WRITTEN.txt', '하하하하')
    .then(() => {

  return fs.readFile('./lecture/WRITTEN.txt');
})
    .then((data) => {

      console.log(data.toString());

    })
    .catch((err) => {
  throw err;
})