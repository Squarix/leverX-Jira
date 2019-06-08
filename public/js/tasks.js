let socket;
let room;

$(document).ready(() => {
  socket = io('http://localhost:3000/tasks');
  room = 'project#' + $('#projectId').val();

  $('#taskForm').hide();
  console.log(room);

  socket.on('data', data => console.log(data));
  socket.on('connection', data => console.log(data));
  socket.on('joined', data => console.log(data));


  socket.emit('joinRoom', room);

  socket.on('changeStatus', () => {
    console.log('changing status');
  });

  socket.on('addTask', task => appendTask(task))

  $('#addTask').on( 'click', (() => showAddForm()));

});

function appendTask(task) {
  let taskBody = '<li class="list-group-item" id="'+ task.id +'">\n' +
                    '<a href="/tasks/{{task.id}}">'+ task.title + '</a>\n' +
                    '<button onclick="changeStatus(\''+ task.id +'\', \'pending\')"></button>\n' +
                 '</li>';
  $('#' + task.status + 'List').append(taskBody);
}

function removeTask(taskId) {
  $('#' + taskId).remove();
}

function showAddForm() {
  $('#taskForm').show();
}

function showUpdateForm(id) {
  $.get('/tasks/info/'+ id, (task) => {
    $('#taskForm input[name=id]').val(task.id);
    $('#taskForm input[name=description]').val(task.description);
    $('#taskForm input[name=title]').val(task.title);
  })

}

function changeStatus(id, status) {
  console.log(room + ', ' + id + ', ' + status);
  socket.emit('changeStatus', { room: room, taskId: id, newStatus: status});
}