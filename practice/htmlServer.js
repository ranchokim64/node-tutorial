const http = require('http');
const fs = require('fs').promises;

//html 파일을 응답.

const server = http.createServer( async (req, res) => {

  //async 는 무조건 에러처리
  try {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
    const data = await fs.readFile('./index.html');
    res.end(data);

  } catch (e) {
    res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8' });
    res.end(e.message);
  }

}).listen(8080);


server.on('listening', () => {
  console.log('접속되었다.');
})

server.on('error', (err) => {
  console.error(err);
})