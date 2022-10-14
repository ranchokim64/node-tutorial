const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');

writeStream.on('finish', () => {
  console.log('파일쓰기완료');
});

writeStream.write('dfdfd\n');
writeStream.write('12345');

writeStream.end();


