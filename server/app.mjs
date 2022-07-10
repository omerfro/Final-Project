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
        
    ]
}

io.on('connection', (socket) => {
    console.log('a user connected, id:',socket.id)
    socket.request.session = 'session1'
    console.log(socket.request.session)
    //console.log('session :', socket.request.session)
    if (!state.rooms[state.rooms.length]){
        if(state.rooms.length === 0){
            createRoom(socket)
            socket.join('room1')
            console.log(io.sockets.adapter.rooms)
        } else if (state.rooms[state.rooms.length - 1].player2.id === ''){
            state.rooms[state.rooms.length - 1].player2.id = socket.id
            console.log('rooms',state.rooms)
        }
        else {
            createRoom(socket)
        }
        //state.rooms[state.rooms.length].player2.id = socket.id
        
    } else {
        createRoom(socket)
    }

    socket.on('start', (data)=> {
        socket.broadcast.emit('start',data)
        if(state.rooms[0].player_turn === 0){
            let player = socket.id
            io.to(player).emit('change-turn')
            state.rooms[0].player_turn = 1
        }
    })

    socket.on('hit', (data) => {
        if(!data.hits_array[data.hits_array.length - 1]){
            state.rooms[0].player_turn === 1 ? state.rooms[0].player_turn = 2 : state.rooms[0].player_turn = 1
            io.emit('change-turn')
        }   
        socket.broadcast.emit('hit', data)
        
    })

    socket.on('end', (data) => {
        io.to(socket.id).emit('game-end','victory')
        socket.broadcast.emit('game-end','lose')
    })
}); 

function createRoom(socket){
    //const length = state.rooms.length
    const game = {player_turn:0, player1:{name:'', id: socket.id}, player2: {name: '',id: ''}   }
    state.rooms.push(game)
}

// app.get('/', (req,res) => {
//     res.status(200).send('HELLO')
// })

httpServer.listen(PORT,HOST, ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`)
})