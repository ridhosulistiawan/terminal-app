const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', function connection(ws) {
    const shell = pty.spawn('/bin/bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 50,
        cwd: process.env.HOME,
        env: process.env,
    });

    shell.on('data', function (data) {
        ws.send(data);
    });

    ws.on('message', function (message) {
        shell.write(message);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

