import "./header.css";
import { append } from "components/todo/todo";

$(document).ready(function() {
  const $input = $(".js-input-new-todo");

  $(".js-form-new-todo")
    .on("ajax:before", function() {
      if (!$input.val().length) return false;
    })
    .on("ajax:success", function(result) {
      $input.val("");
      append(result.detail[0].data);
    });
});
