const buffer = Buffer.from('안녕하세요');

console.log(buffer);
console.log(buffer.toString());
console.log(buffer.length);

//버퍼 합치기

const bufferArray = [Buffer.from('첫번째 '), Buffer.from('두번째 '), Buffer.from('끝')];

console.log(Buffer.concat(bufferArray).toString());

console.log(Buffer.alloc(5));