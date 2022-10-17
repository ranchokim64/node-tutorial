const http = require('http');
const fs = require('fs').promises;

const users = {}; //데이터저장용


const server = http.createServer(async (req, res) => {

  const {headers, method, url, body } = req;
  // console.log('header : ', headers);
  // console.log('method : ', method );
  // console.log('url : ', url);
  // console.log('body : ', body);

  try {

    if(method === 'GET') {
      console.log('get request');
      if(url === '/') {
        console.log('home');
        try {
          console.log('트라이로 들어옴')
          const data = await fs.readFile('./restFront.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);

        } catch (e) {
          console.error(e)
        }

      } else if(url === '/about') {
        console.log('about');
        try {
          const data = await fs.readFile('./about.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          return res.end(data);
        } catch (e) {
          console.error(e)
        }

      } else if(url === '/users') {

        try {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
          //객체를 전달하면 오류가 남. string 값으로 바꿔서 보내야함.
          return res.end(JSON.stringify(users))

        } catch (e) {
          console.error(e);
        }


      }

      // /도 /about도 /users도 아니면    ... 아래 코드가 없으면 css와 js파일을 계속 찾기 위해 대기함.
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        console.log(err);
      }


    } else if(method === 'POST') {

      if(url === '/user') {

        console.log('포스트날라옴');
        let body = '';
        //req 의 body 를 stream 으로 받아야함.
        req.on('data', (chunk) => {
          body += chunk;
        });

        //요청 다받음
        return req.on('end', () => {

          const { name } = JSON.parse(body); //json 객체로 바꾸기;
          const id = Date.now();
          users[id] = name;

          console.log(users);

          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');

        })

      }
    } else if (method === 'PUT') {

      if(url.startsWith('/user/')) {

        const key = req.url.split('/')[2];
        let body = '';
        //req 의 body 를 stream 으로 받아야함. 그렇지 않으면 오류
        req.on('data', (chunk) => {
          body += chunk;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).putData;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        })
      }
    } else if (method === 'DELETE') {
      if(url.startsWith('/user/')) {
        const key = url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');

      }




    }


    res.writeHead(404);
    return res.end('NOT FOUND');



  } catch (e) {
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(e.message);
  }


}).listen(8088);


server.on('listening', () => {
  console.log('서버에서 응답 대기중')
});

server.on('error', (err) => {
  console.log(err);
})