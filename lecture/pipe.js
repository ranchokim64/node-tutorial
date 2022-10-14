const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./README3.txt', { highWaterMark: 16});
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme3.txt');
readStream.pipe(zlibStream).pipe(writeStream);