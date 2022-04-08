const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

//database connection
const connectDB = require("./server/database/connection");
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

//log all http request to the console
app.use(morgan("tiny")); 

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/media', express.static(path.resolve(__dirname, "assets/media")));
app.use('/plugins', express.static(path.resolve(__dirname, "assets/plugins")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load application routes for page rendering
app.use("/", require("./server/routes/index"));
// app.use("/", require("./servers/routes/auth"));


//listening port 
const port = process.env.PORT || 8000

//start a server
app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})