// async
//

/* eslint-disable */

const async = require('async');
const fs = require('fs');
const path = require('path');

const folderToArchive = path.join(__dirname, 'node_modules');

const getEntriesSync = function (directory) {
  const entries = fs.readdirSync(directory);
  const results = {};



  entries.forEach((entry) => {
    entry = path.join(directory, entry);

    if (fs.statSync(entry).isFile()) {
      results[entry] = /*fs.readFileSync(entry)*/ 0;
      return;
    }

    const innerEntries = getEntriesSync(entry);

    Object.assign(results, innerEntries);
  });

  return results;
};

const getEntriesAsync = function (directory, callback) {
  let results = {};

  fs.readdir(directory, (error, entries) => {

    async.each(entries, (entry, done) => {
      entry = path.join(directory, entry);

      fs.stat(entry, (error, stats) => {
        if (stats.isFile()) {
          results[entry] = 0;
          done();
          return;
        }

        getEntriesAsync(entry, (error, innerEntries) => {
          Object.assign(results, innerEntries);

          done();
        });
      });
    }, (error) => {
      callback(null, results);
    });

    // Promise.all(entries.map((entry) => {
    //   entry = path.join(directory, entry);

    //   return new Promise((resolve) => {
    //     fs.stat(entry, (error, stats) => {
    //       if (stats.isFile()) {
    //         results[entry] = 0;
    //         resolve();
    //         return;
    //       }

    //       getEntriesAsync(entry, (error, innerEntries) => {
    //         Object.assign(results, innerEntries);

    //         resolve();
    //       });
    //     });
    //   });
    // }))
    // .then(() => {
    //   callback(null, results);
    // })
    // .catch((error) => {
    //   callback(error);
    // });

    // entries.forEach((entry) => {
    //   entry = path.join(directory, entry);

    //   fs.stat(entry, (error, stats) => {
    //     if (stats.isFile()) {
    //       results[entry] = 0;
    //       return;
    //     }

    //     getEntriesAsync(entry, (error, innerEntries) => {
    //       Object.assign(results, innerEntries);
    //     });
    //   });


    // });
  });
};

getEntriesAsync(folderToArchive, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
})





// const getEntries = function (directory, callback) {
//   const results = {};

//   async.waterfall([
//     function readDirectory(next) {
//       fs.readdir(directory, next);
//     },
//     function processEntries(entries, complete) {
//       async.each(entries, function processEntry(entry, done) {
//         entry = path.join(directory, entry);

//         async.waterfall([
//           function getStats(next) {
//             fs.stat(entry, next);
//           },
//           function processStats(stats, next) {
//             if (!stats.isFile()) {
//               getEntries(entry, function processInnerEntries(error, innerEntries) {
//                 if (error) {
//                   done(error);
//                   return;
//                 }

//                 Object.assign(results, innerEntries);

//                 done(null);
//               });

//               return;
//             }

//             next(null);
//           },
//           function readFile(next) {
//             fs.readFile(entry, function processFile(error, fileContent) {
//               next(error, fileContent);
//             });
//           },
//           function addFileToResults(fileContent, next) {
//             results[entry] = fileContent;
//             next(null);
//           }
//         ], done);
//       }, complete);
//     }
//   ], function finish(error) {
//     callback(error, results);
//   });
// };

// console.log(getEntriesSync(folderToArchive));

// getEntries(folderToArchive, function (error, result) {
//   console.log(Object.getOwnPropertyNames(result).sort((a, b) => {
//     if (a < b) {
//       return -1;
//     } else {
//       return 1;
//     }
//   }).join('\n'));
// });
