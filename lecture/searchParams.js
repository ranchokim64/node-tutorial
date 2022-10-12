const  { URL }  = require('url');
console.log(URL)

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=node.js&category=javascript');

console.log('SearchParams : ', myURL.searchParams);
console.log('SearchParams.getAll : ', myURL.searchParams.getAll('category'));
console.log('SearchParams.get : ', myURL.searchParams.get('limit'));
console.log('SearchParams.has : ', myURL.searchParams.has('page'));


console.log('SearchParams.key : ', myURL.searchParams.keys());
console.log('SearchParams.value : ', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');

myURL.searchParams.set('filter', 'es6');
myURL.searchParams.delete('filter');
console.log('SearchParams : ', myURL.searchParams)
console.log('SearchParams tostring : ', myURL.searchParams.toString())
