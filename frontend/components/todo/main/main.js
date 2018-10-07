import "./main.css";

function appendTodoItem(item) {
  $('.js-todo-list').append(todoItem(item))
}

function todoItem(item) {
  return `<li data-id="${item.id}">
    <div class="view">
      <input class="toggle js-toggle-item" type="checkbox">
      <label class="js-label-item" data="${item.status}">${item.content}</label>
      <button class="destroy js-destroy-item"></button>
    </div>
    <input class="edit js-edit-item" value="${item.content}">
  </li>`;
}

function updateTodo(value) {
  $.ajax({
    'type': 'PUT'
  });
}

$(document).ready(function() {
  $(document).on('dblclick', '.js-label-item', function() {
    $(this).closest('li').addClass('editing');

  }).on('focusout', '.js-edit-item', function() {
    let $parent = $(this).parent('li'),
        value = $(this).val();

    $parent.removeClass('editing');
    $parent.find('.js-label-item').html(value);
  });

});

export { appendTodoItem }
