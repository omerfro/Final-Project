import http from 'http';
import express from 'express';
import log from '@ajar/marker';
import { Server } from "socket.io";
import cors from 'cors';
import morgan from 'morgan';

const { PORT, HOST } = process.env;

const app = express()
app.use(cors())
app.use(morgan('dev'))

const httpServer = http.createServer(app);
const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('a user connected, id:',socket.id)
});

app.get('/', (req,res) => {
    res.status(200).send('HELLO')
})

httpServer.listen(PORT,HOST, ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`)
})