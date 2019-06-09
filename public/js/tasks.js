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

  socket.on('changeStatus', (task) => {
    console.log(task);
    let element = $('#task-' + task.id);
    element.remove();
    $('#' + task.status + 'List').append(element);

  });

  socket.on('addTask', task => appendTask(task));
  socket.on('removeTask', taskId => removeTask(taskId));
  socket.on('updateTask', task => update(task));

  $('#addTask').on( 'click', (() => showAddForm()));
  $('#formPrevent').on('click', (e) => e.preventDefault() );

});

function appendTask(task) {
  console.log('appending task');
  let taskBody = '<li class="list-group-item" id="task-'+ task.id +'">\n' +
                    '<a href="/tasks/'+ task.id +'">'+ task.title + '</a>\n' +
                    '<br>' +
                    '<button onclick="changeStatus(\''+ task.id +'\', \'' + task.status +'\')" class="btn btn-primary btn-sm">Next</button>\n' +
                    '<button onclick="deleteTask('+ task.id + ')" class="btn btn-danger btn-sm">Delete</button>' +
                    '<button onclick="showUpdateForm('+ task.id +')" class="btn btn-secondary btn-sm">Update</button>' +
                 '</li>';
  $('#' + task.status + 'List').append(taskBody);
}

function removeTask(taskId) {
  $('#task-' + taskId).remove();
}

function showAddForm() {
  $('#taskForm').show();
  $('#taskButton').on('click', () => createTask());
}

function showUpdateForm(id) {
  $.get('/tasks/info/'+ id, (task) => {
    $('#taskForm input[name=id]').val(task.id);
    $('#taskForm textarea[name=description]').val(task.description);
    $('#taskForm input[name=title]').val(task.title);
    $('#taskForm').show();
    $('#taskButton').on('click', () => updateTask());
  });

}

function changeStatus(id, status) {
  console.log(room + ', ' + id + ', ' + status);
  socket.emit('changeStatus', { room: room, taskId: id, newStatus: status});
}

function deleteTask(id) {
  console.log('deleting task');
  socket.emit('deleteTask', {taskId: id, room: room });
}

function createTask() {
  console.log('creating task');
  socket.emit('addTask', getFormData());
}

function updateTask() {
  console.log('updating task');
  socket.emit('updateTask', getFormData());
}

function update(task) {
  $('#task-' + task.id).remove();
  appendTask(task);
}

function getFormData() {
  let data = {
    projectId: $('#projectId').val(),
    title: $('#formPrevent #title').val(),
    description: $('#formPrevent #description').val(),
    room: room,
  };
  return data;
}