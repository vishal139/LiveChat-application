const socket = io();

// getting username 
let username;
do{
    username = prompt('Enter your name to join the chat');
}
while(!username);


// dom manupulation 
const textarea = document.querySelector('#textarea');
const sendBtn = document.querySelector('#sendBtn');
const message_section = document.querySelector('.message_section')

// notification audio
const audio = new Audio('tone.mp3');

// adding event listener
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    {
        const message = e.target.value.trim();
        if(message==='')
        {
            return;
        }
        const msg={
            user:username,
            message:message.trim(),
        }
        AppendToDom(msg,'outgoing');
        textarea.value='';
        socket.emit('message_to_serve',msg);

    }
})

sendBtn.addEventListener('click',()=>{
    const msg={
        user:username,
        message:textarea.value.trim(),
        }
    AppendToDom(msg,'outgoing');
    textarea.value='';
    scrollToBottom();

// sending the message  to the  server to redistribute to all the socket connection
    socket.emit('message_to_serve',msg);
})

// function to appending message in the dom

function AppendToDom(msg,type){

    const new_chat = document.createElement('div');
    let classname =type;
    new_chat.classList.add('message',classname);

    const markup = `
    <h6>${msg.user}</h6>
    <p>${msg.message}</p>
    `
    new_chat.innerHTML = markup;
    message_section.appendChild(new_chat);
    if(type==='incoming')
    {
        audio.play();
    }
}

// getting the message back from the server and sending it to the all the socket connection

socket.on('message_to_client',(msg)=>{
    AppendToDom(msg,'incoming');
    scrollToBottom();
})


// function to get scrolled to the latest message

function scrollToBottom(){
    message_section.scrollTop=message_section.scrollHeight;
}

