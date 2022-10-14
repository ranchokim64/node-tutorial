const http = require('http');
const fs = require('fs').promises;


const server = http.createServer(async (req, res) => {

  try {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    const data = await fs.readFile('./server2.html');
    res.end(data);
  } catch (error) {
    console.error(error);
    res.writeHead(200, { 'Content-Type': 'text/plane; charset=utf-8'});
    res.end(error.message);


  }


}).listen(8080, () => {
  console.log('서버열림');
});

server.on('error', (err) => {
  console.error(err);
})

