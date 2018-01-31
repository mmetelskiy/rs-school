/* eslint-disable */

const http = require('http');
const fs = require('fs');
const mime = require('mime');
const path = require('path');
// const { URL } = require('url');

const ROOT = path.join(__dirname, '/public'); // ../../fdsa

const endWithCode = function (res, code, text) {
	res.statusCode = code;
	res.end(`<h1>${code}${text ? `: ${text}` : ''}</h1>`);
};

http.createServer((req, res) => {
	let fileName = req.url;

	if (req.method === 'GET') {
		if (req.url === '/') {
			fileName = '/index.html';
		}

		const fullPath = path.join(ROOT, fileName);

		if (fullPath.indexOf(ROOT) !== 0) {
			endWithCode(res, 403);
			return;
		}

		fs.stat(fullPath, (err, stats) => {
			if (err || !stats.isFile()) {
				endWithCode(res, 404, 'page not found');
				return;
			}

			fs.readFile(fullPath, { encoding: 'utf8' }, (err, data) => {
				if (err) {
					if (err.code === 'ENOEND') {
						endWithCode(res, 404, 'page not found');
					} else {
						endWithCode(res, 500, 'server error');
					}

					return;
				}

				res.writeHead(200, {
					'Content-Type': mime.lookup(fileName)
				});
				res.end(data);
			});
		});
	}
}).listen(8081, () => {
	console.log('server started');
});

setTimeout(() => {
	http.request('http://localhost:8081/../private_rsa_key', (res) => {
		console.log(res.statusCode);
		res.setEncoding('utf8');

		res.on('data', console.log);
		res.on('end', () => {
			console.log('_the_end');
		});
		res.on('error', console.log);
	}).end();
}, 1000);
