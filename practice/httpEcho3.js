const http = require('http');

http.createServer((req, res) => {

  const {headers, method, url, body} = req;



  //에러처리

  req.on('error', (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end();
  });

  res.on('error', (err) => {

    console.error(err);
  })



  if(method === 'POST' && url === '/echo') {

    req.pipe(res);

  } else {

    res.statusCode = 404;
    res.end();

  }

}).listen(8080);