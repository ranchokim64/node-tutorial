const fs = require('fs');


fs.readFile('./README.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log('1번', data.toString());
});

fs.readFile('./README.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log('2번', data.toString());
});

fs.readFile('./README.txt', (err, data) => {
  if (err) {
    throw err
  }

  console.log('3번', data.toString());
});