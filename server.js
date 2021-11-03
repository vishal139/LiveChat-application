
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;


// using express middle ware to serve static  file
app.use(express.static(__dirname +'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

const server = app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})

// setup socket io
const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    //getting response from the client  and againn broadcasting to  the all socket connection

    socket.on('message_to_serve',(msg)=>{
        socket.broadcast.emit('message_to_client',msg);
    })
})