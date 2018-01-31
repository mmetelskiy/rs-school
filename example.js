 /* eslint-disable no-console */

// Buffer
const username = 'hello';
const password = 'world';

const base64encoded = Buffer.from(`${username}:${password}`/*, 'utf8'*/).toString('base64');

console.log(base64encoded);
console.log(Buffer.from(base64encoded, 'base64').toString('utf8'));

// os
const os = require('os');

os.EOL         // '\r\n' or '\n'
os.arch()      // x64
os.homedir()   // /home/misha
os.hostname()  // kubuntu
os.platform()  // linux
os.tmpdir()    // /tmp
os.type()      // Linux

os.constants
os.cpus()

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

// const getProps = function (callback) {
//   fs.readFile('props.propertiess', 'utf8', function processFileContents(error, data) {
//     if (error) {
//       callback(error);
//       return;
//     }

//     callback(null, data);
//   });
// };

// getProps(function processProps(error, propsText) {
//   if (error) {
//     throw error;
//     return;
//   }
//   console.log(propsText);
// });

// Promise
//   .resolve()
//   .then(() => {
//   })
//   .then(() => {
//   })
//   .then(() => {
//     return Promise.reject(new Error('lol: count thens, find line with error'));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Promise
//   .resolve()
//   .then(function operationX() {
//   })
//   .then(function operationY() {
//   })
//   .then(function operation_Ы() {
//     return Promise.reject(new Error('cool stackrace'));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

Promise
  .resolve()
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
  })
  .then(() => {
    // so much code
    // so much code
    // read it all
    // enjoy
    return Promise.reject(new Error('lol: count thens, find line with error'));
  })
  .catch((error) => {
    console.log(error);
  });

