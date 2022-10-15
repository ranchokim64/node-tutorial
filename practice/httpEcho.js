const http = require('http');


//emit 객체 반환 , 웹서버 객체임, http 요청마다 createServer에 전달된 함수가 실행됨. eventEmitter 추후 공부.
http.createServer((req, res) => {
  //req : 요청 , res : 응답

  //요청 받은 데이터를 아래 배열에 전달
  let body = [];

  //온 요청의 method 와 url 구조분해 할당. req는 incommingMessage의 인스턴스다.
  const { method, url, headers } = req;

  //요청 핸들러. req는 ReadableStream 인터페이스를 구현 / 여기에 이벤트 리스너를 등록하거나 다른 스트림에 파이프로 연결 가능.
  //data 이벤트 리스너 등록하여 데이터를 받아야함.
  req.on('error', (err) => { //항상 에러 처리해줘야함.
    console.log(err);
  })
  .on('data', (chunk) => {
    body.push(chunk);

  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log("body : ", body);
    console.log("method : ", method);
    console.log("url : ", url);
    console.log("header :", headers);
    
    //res
    //에러처리
    res.on('error', (err) => {
      console.log(err);
    });

    res.writeHead(200, {'Content-Type' : 'application/json'})
    const resBody = {headers, method, url, body};

    res.write(JSON.stringify(resBody));
    res.end();

  })

}).listen(8080);  // 서버를 활성화 8080포트로 받ㄷ음.


