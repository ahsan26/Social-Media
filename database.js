const Mongoose = require("mongoose");

Mongoose.connect("mongodb://admin:admin0000@ds125181.mlab.com:25181/social_media", { useNewUrlParser: true });
let db = Mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
    console.log("Database is Connected!");
    return db;
});