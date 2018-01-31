 /* eslint-disable no-console */

// Buffer
const username = 'hello';
const password = 'world';

const base64encoded = Buffer.from(`${username}:${password}`/*, 'utf8'*/).toString('base64');

console.log(base64encoded);
console.log(Buffer.from(base64encoded, 'base64').toString('utf8'));

// os
const os = require('os');

console.log(os.constants);
console.log(os.EOL);
console.log(os.cpus());
console.log(os.arch());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.platform());
console.log(os.tmpdir());
console.log(os.type());

// querystring
const querystring = require('querystring');

const obj = {
  hello: 'world',
  foo: ['bar', 'baz']
};

console.log(querystring.stringify(obj));
console.log(querystring.stringify(obj, '\n', '=>'));

const fs = require('fs');
// const os = require('os');

console.log(querystring.parse(fs.readFileSync('props.properties', 'utf8'), '\n', '='));
console.log(querystring.parse(fs.readFileSync('props.properties', 'utf8'), os.EOL, '='));

// child_process
// cowsay

// events
// crypto + tcp + process


// fs + path


// http + path + fs - http-server

// stream

// url

// http + cluster

// try/catch with callbacks/promises
