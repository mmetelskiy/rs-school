// Promises: native vs bluebird

// const Promise = require('bluebird');

const f = () => {
  Promise.reject(new Error('oh no'));
};

f();


// uncaughtException
//
// process.on('uncaughtException', (error) => {
//   console.log('caught!');
//   console.log(error);
// });

// setTimeout(() => {
//   console.log('on timeout');
// }, 500);

// throw new Error('OMG! Error!');

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();

// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });

// myEmitter.emit('event');

// const { spawn } = require('child_process');
// const cowsay = spawn('cowsay', ['hello world']);

// cowsay.stdout.pipe(process.stdout);

// const { exec } = require('child_process');

// exec('cowthink hello world', (error, stdout, stderr) => {
//   console.log(stdout);
// });

// const asyncFunc = function (callback) {
//   try {
//     // try ¯\_(ツ)_/¯
//     // wow it worked
//     callback(null);
//   } catch (error) {
//     callback(error);
//   }
// };

// const asyncFunc = function (callback) {
//   let error;

//   try {
//     // try ¯\_(ツ)_/¯
//     // wow it worked
//   } catch (errorWhileTrying) {
//     error = errorWhileTrying;
//   }

//   callback(error);
// };
