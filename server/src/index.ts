import { Server } from 'socket.io';




const io = new Server(3000, {
    cors: {
        origin: ['http://localhost:5173']
    }
});

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('send-message', (msg, room) => {
        console.log(msg, room);

        if (room == "") {

            socket.broadcast.emit('recieve-message', msg);
        } else {
            socket.to(room).emit('recieve-message', msg);
        }
    });

    socket.on('join-room', room => {
        socket.join(room);
    });
});




