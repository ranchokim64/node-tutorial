const http = require('http');

http.createServer((req, res) => {

  const {headers, method, url, body} = req;

  //method 가 post 일 때 , url 이 /echo 일 때 응답을 보낸다. 그렇지 않은경우 404 status code 를 보낸다.
  if( method === 'POST' && url === '/echo') {
    let body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          console.log(body);
          res.end(body);
        })

  } else {
    console.log('이상한데?');
    res.statusCode = 404;
    res.end();
  }
}).listen(8080);