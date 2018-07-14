const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UserRoutes = require("./routes/user");
const FriendsRoute = require('./routes/friends');
const MessagesRoute = require('./routes/messages');
const socket = require('socket.io');
const parseToken = require('./Utils/parseToken');
const postsRoute = require('./routes/posts');
let users = [];

// Setting Middle Wares 
app.use(bodyParser.json());

// Integrating MLAB Database
require('./database');


// Port Setting
app.set('port', 6500 || process.env.PORT);

// Setting Default folder
app.use(express.static('public'));


// Setting Routes
app.use(UserRoutes);
app.use('/friends', FriendsRoute);
app.use('/posts',postsRoute)

const server = app.listen(app.get('port'), function () {
    console.log(`Server is Started on ${app.get('port')}`);
});

const io = socket(server);

io.on("connection", function (socket) {
    console.log("Client Connected", socket.id);
    socket.on('userInfo', async function (data) {
        let info = await parseToken(data.token);
        users.push({ userId: info.userId, _id: socket.id });
        setMessageRoute();
    });
    socket.on('disconnect', async function () {
        users = await users.filter(item => item._id !== socket.id);
        setMessageRoute();
    });
});
function setMessageRoute() {
    app.use('/message', MessagesRoute(io, users));
}
setMessageRoute();