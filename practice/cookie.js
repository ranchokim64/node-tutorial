const http = require('http');

const server = http.createServer((req, res) => {

  console.log('req url : ', req.url);
  console.log('req cooke : ', req.headers.cookie);

  // res.setHeader('Set-Cookie', ['name:jonghyeon']);
  res.writeHead(200, {'Set-Cookie': 'name=jonghyeon3'});
  res.end('<h1>cookie hello</h1>');


});


server.on('listening', () => {
  console.log('서버가 실행중이에요.');
})


server.listen(8099);
