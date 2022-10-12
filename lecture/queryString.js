const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=node.js&category=javascript');

console.log(parsedUrl);

const query = querystring.parse(parsedUrl.query); //url의 query 부분을 객체로 분해해줌.

console.log(parsedUrl.query);

console.log('querystring.parse() : ', query);
console.log('querystring.stringify() : ', querystring.stringify(query)) //분해된 query 객체를 문자열로 조합해줌.