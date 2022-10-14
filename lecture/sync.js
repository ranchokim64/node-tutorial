const fs = require('fs');


const sync = fs.readFileSync('./README.txt');

console.log(sync.toString());
