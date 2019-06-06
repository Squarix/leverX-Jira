const socket = io('http://localhost:3001/tasks')
socket.on('data', data => console.log(data));
socket.on('connection', data => console.log(data));
socket.on('joined', data => console.log(data));