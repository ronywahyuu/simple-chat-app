const express = require('express')
const app = express()
const port = 3001
const morgan = require('morgan')
const socket = require('socket.io')
const http = require('http');
const server = http.createServer(app);

app.use(morgan('dev'))

const io = socket(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// init connection
io.on('connection', (socket) => {

    // socket.on buat nangkep/listen pesan dengan nama event "chat message" dari emitter/pengirim pesan
    socket.on('chat message', (msg) => {
        // socket.broadcast.emit buat memancarkan broadcast dengan nama event "broadcast" yg nantinya diterima penerima
        socket.broadcast.emit('broadcast', msg)

        
        // io.emit('chat message', msg)

        console.log(`Message : ${msg} `);
    })

    // event "disconnect" bakal ke trigger ketika browser di-refres"
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})