import http from 'http';
import express from 'express';
import log from '@ajar/marker';
import { Server } from "socket.io";
import cors from 'cors';
import morgan from 'morgan';
import session from "express-session";

const { PORT, HOST } = process.env;

const app = express()

app.use(cors())
app.use(morgan('dev'))

const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const state = {
    rooms: [
        
    ],
    counter: 0
}

io.on('connection', (socket) => {
    console.log('a user connected, id:',socket.id)
    socket.request.session = `roomsession-${state.counter}`

    if(!state.rooms[socket.request.session]){
        createRoom(socket)
        socket.join(socket.request.session)
        io.in(socket.request.session).emit('add-player', 1)
    } else {
        if(state.rooms[socket.request.session].players.length === 1){
            socket.join(socket.request.session)
            const player = {name:'', id: socket.id}
            state.rooms[socket.request.session].players.push(player)
            state.counter++
            io.in(socket.request.session).emit('add-player', 2)
        } else {
            createRoom(socket)
            socket.join(socket.request.session)
            io.in(socket.request.session).emit('add-player', 1)
        }
    }

    socket.on('start', (data)=> {
        socket.broadcast.emit('start',data)
        if(state.rooms[socket.request.session].player_turn === 0){
            let player = socket.id
            io.to(player).emit('change-turn')
            state.rooms[socket.request.session].player_turn = 1
        }
    })

    socket.on('hit', (data) => {
        if(!data.hits_array[data.hits_array.length - 1]){
            state.rooms[socket.request.session].player_turn === 1 ? state.rooms[socket.request.session].player_turn = 2 : state.rooms[socket.request.session].player_turn = 1
            io.in(socket.request.session).emit('change-turn')
        }   
        socket.to(socket.request.session).emit('hit', data)
        
    })

    socket.on('end', (data) => {
        io.to(socket.id).emit('game-end','victory')
        socket.to(socket.request.session).emit('game-end','lose')
    })
});     

function createRoom(socket){
    const room = {players: [{name:'', id: socket.id}], player_turn: 0 }
    state.rooms[socket.request.session] = room
}   

// app.get('/', (req,res) => {
//     res.status(200).send('HELLO')
// })

httpServer.listen(PORT,HOST, ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`)
})