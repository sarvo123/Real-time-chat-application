const express  = require('express');
const dotenv = require('dotenv');
const {chats} = require("./data/data"); 
const { connect } = require('mongoose');
const connectDB = require('./config/db');
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {errorHandler , notFound} = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express ();
connectDB();
app.use(express.json());   // to accept json data ..

app.get("/",(req,res) => {
    res.send("api is running successfully ");
});

app.use('/api/user',userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message' , messageRoutes);

app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = app.listen(5000,console.log(`server is started on ${PORT}`.yellow.bold));
const io = require("socket.io")(server  , {
    pingTimeout : 60000 ,
    cors  : {
        origin : "http://Localhost:3000",
    }
});

io.on("connection" , (socket)=> {
    console.log("connected to socket.io");

    socket.on("setup " , (userData) =>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });

    socket.on('join chat ' , (room) =>{
        socket.join(room);
        console.log("user joined the room :" + room);
    });

    socket.on('new message' , (newMessageRecieved)=>{
        var chat  = newMessageRecieved.chat;

        if(!chat.users){
            return console.log("chat.user is not defined");
        }

        chat.users.forEach( user => {
            if(user._id == newMessageRecieved.sender._id ) return ;

            socket.in(user._id).emit("message recieved" , newMessageRecieved);

            
        });

    })

    
});
