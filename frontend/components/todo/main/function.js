export const appendTodoItem = item => {
  $(".js-todo-list").append(_templateTodoItem(item))
};


export const updateTodo = (value, url) => {
  let request = $.ajax({ method: "PUT", url: url, data: { content: value } });
  _alertRequestFail(request);
};

export const deleteTodo = (url) => {
  let request = $.ajax({ method: "DELETE", url: url });
  _alertRequestFail(request);
  return request;
};

export const updateCompletedTodo = (url) => {
  let request = $.ajax({ method: "PUT", url: url });
  _alertRequestFail(request);
  return request;
}

// PRIVATE FUNCTIONS

const _alertRequestFail = (request) => {
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}

const _templateTodoItem = item => {
  return `<li data-id="${item.id}">
    <div class="view">
      <input class="toggle js-toggle-status" type="checkbox">
      <label class="js-label-item">${item.content}</label>
      <button class="destroy js-destroy-item"></button>
    </div>
    <input class="edit js-edit-item" value="${item.content}">
  </li>`;
};
