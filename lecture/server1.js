const http = require('http');


const server = http.createServer((req, res) => {


  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>hello</h1>')
  res.write('<h3>howareyou</h3>');
  res.end('<p>haha</p>');


}).listen(8080, () => {
  console.log('서버열림');
});

server.on('error', (err) => {
  console.error(err);
})

