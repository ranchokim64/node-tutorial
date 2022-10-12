const fs = require('fs').promises;


fs.readFile('./lecture/README.txt').then((data) => {

      console.log(data.toString());
}).catch((err) => {
  throw err;
})