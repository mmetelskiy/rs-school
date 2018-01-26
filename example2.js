// Promises: native vs bluebird
//
const Promise = require('bluebird');

Promise.reject(new Error('oh no'));


// uncaughtException
//
process.on('uncaughtException', (error) => {
  console.log('caught!');
  console.log(error);
});

setTimeout(() => {
  console.log('on timeout');
}, 500);

throw new Error('lol');
