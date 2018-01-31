var express = require('express');
var cluster = require('cluster');

if (cluster.isMaster) {
	var num = require('os').cpus().length;

	for (var i = 0; i < num; ++i) {
		cluster.fork();
	}

	cluster.on('exit', function (worker) {
		console.log('Worker ' + worker.process.pid + ' died');
		cluster.fork();
	});
	cluster.on('online', function (worker) {
		console.log('Worker ' + worker.process.pid + ' lives');
	});
	cluster.on('message', function () {
		for(var id in cluster.workers) {
			cluster.workers[id].send({type: 'kill'});
		}
	});
} else {
	var calculatePI = function () {
		var pi = 0;
		var i;
		for(i = 1; i < 1000000000; ++i) {
			pi += 1 / i / i;
		}
		return Math.pow(pi * 6, 1 / 2);
	};

	var app = express();

	app.use(express.static('static'));

	app.get('/calc', function (req, res) {
		// res.send('' + calculatePI());
		res.send('NEW: ' + calculatePI());
		res.end();
	});
	app.get('/kill', function (req, res) {
		res.end();
		process.exit(0);
	});
	app.get('/rebuild', function () {
		cluster.worker.send('rerun');
	});

	process.on('message', function (message) {
		if (message.type === 'kill') {
			process.exit(0);
		}
	});

	app.listen(4001);
}
