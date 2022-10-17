const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');




const parseCookies = (cookie = '') => {
  return (
      cookie
          .split(';')
          .map(v => v.split('='))
          .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
          }, {})
  )


}


const server = http.createServer(async (req, res) => {

  const cookies = parseCookies(req.headers.cookie); // {name : jonghyeon3}

  if(req.url.startsWith('/login')) { //로그인 버튼을 클릭했을때(get)
    console.log(typeof req.url);
    console.log(req.url);
    const queryString = url.parse(req.url);
    console.log('queryString', queryString);
    const { query }  = url.parse(req.url);
    console.log( 'url', req.url);
    console.log( 'parsed url(query) : ', query); //query : name=aaa
    const { name } = qs.parse(query);  // const {name} =  { name: 'aaa'  }        ->    const name = 'aaa'
    console.log('parsed query :', name);

    //쿠키 유효시간을 현재 + 5분
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,

    });
    res.end();


  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${cookies.name}님 안녕하세요`);


  } else {

    try {
      const index = await fs.readFile('./cookie2.html');
      res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' });
      res.end(index);

    } catch (err) {
      res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
      res.end(err.message);

    }

  }







})

server.listen(8080);
server.on('listening', () => {
  console.log('써버 실행중');
})
