const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev})
const nextHandler = nextApp.getRequestHandler();

const cookieParser = require("socket.io-cookie-parser");
const {authSocketMiddleware} = require("./middleware/authSocketMiddleware");
const {postMessageCollection} = require("./service/messages-usecase.d");

let port = process.env.PORT;

io.use(cookieParser());
io.use((socket, next) => {
    socket.handshake.auth = socket.request.cookies.Authorization;
    next();
});
io.use(async (socket, next) => await authSocketMiddleware(socket, next));

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    socket.leaveAll();

    let chat;
    if ((chat = socket.handshake.query.chatId)) {
        socket.join(chat);
    }

    socket.on("chat.join", (data) => {
        socket.leaveAll();
        if (data) {
            socket.join(data);
        }
    });

    socket.on("message.create", async (data) => {
        const chatRoom = socket.rooms.keys().next().value;

        try {
            const message = await postMessageCollection({
                userId: socket.request.user.id,
                chatId: data.chat,
                text: data.text
            });

            socket.in(chatRoom).emit('message.created', message);
        } catch (e) {
            socket.emit("message.error", e.message);
        }

    });
});


nextApp.prepare().then(() => {
    app.use((req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Listen http://localhost:${port}`);
    });
});