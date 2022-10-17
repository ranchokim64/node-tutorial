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

const session = {};

const server = http.createServer(async (req, res) => {

  const cookies = parseCookies(req.headers.cookie); // {name : jonghyeon3}

  if(req.url.startsWith('/login')) { //로그인 버튼을 클릭했을때(get)

    const { query }  = url.parse(req.url);
    const { name } = qs.parse(query);  // const {name} =  { name: 'aaa'  }        ->    const name = 'aaa'
    const name2 = 'bbb';
    console.log(typeof name);
    console.log(typeof  {name});
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now();

    //변수를 사용하여 객체를 선언하는 방법 ,, 익혀둘것
    session[uniqueInt] = {
      name,
      expires,
      name2,
    }

    console.log(session);


    res.writeHead(302, {
      location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,

    });
    res.end();


  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${session[cookies.session].name}님 안녕하세요`);


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
