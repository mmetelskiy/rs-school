// uncaughtException
// GET /weather?latitude=..&longitude=..
// POST /weather { latitude, longitude }

const express = require('express');

const serverConfig = require('./config').server;

// check port
