import "./footer.css";
import * as Todo from "components/todo/todo";

const arrayID = () => {
  let id = []
  $('.js-todo-list').each(function() {
    id.push($(this).data('id'));
  });
  return id;
};

$(document).ready(function() {
  $('.js-clear-completed').on('click', function() {
    Todo.clearCompleted(arrayID())
  });
});
