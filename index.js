const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UserRoutes = require("./routes/user");
const FriendsRoute = require('./routes/friends');

// Setting Middle Wares 
app.use(express.json());

// Integrating MLAB Database
require('./database');


// Port Setting
app.set('port', 6900 || process.env.PORT);

// Setting Default folder
app.use(express.static('public'));


// Setting Routes
app.use(UserRoutes);
app.use('/friends', FriendsRoute)

app.listen(app.get('port'), function () {
    console.log(`Server is Started on ${app.get('port')}`);
});