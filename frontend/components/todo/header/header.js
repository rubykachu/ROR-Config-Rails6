import "./header.css";
import { appendTodoItem } from "components/todo/main/function";

$(document).ready(function() {
  const $input = $(".js-input-new-todo");

  $(".js-form-new-todo")
    .on("ajax:before", function() {
      if (!$input.val().length) {
        return false;
      }
    })
    .on("ajax:success", function(result) {
      $input.val("");
      appendTodoItem(result.detail[0].data);
    });
});
