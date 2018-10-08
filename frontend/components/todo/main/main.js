import "./main.css";
import * as Todo from "components/todo/todo";

$(document).ready(function() {
  $(document).on("dblclick", ".js-label-item", function() {
    $(this).closest("li").addClass("editing");

  }).on("change", ".js-edit-item", function() {
    let $parent = $(this).parent("li"),
        value   = $(this).val(),
        id      = $parent.data("id");

    $parent.removeClass("editing");
    $parent.find(".js-label-item").html(value);
    Todo.update(value, id);

  }).on("click", ".js-destroy-item", function() {
    let $parent = $(this).closest("li"),
        id      = $parent.data("id");
    Todo.remove(id).done(function() {
      $parent.remove();
    });

  }).on("click", ".js-toggle-completed", function() {
    let $parent = $(this).closest("li"),
        id      = $parent.data("id"),
        data    = $parent.data("completed");
    Todo.completed(id, data).done(function(result) {
      $parent.data("completed", result.data[0].status);
      $parent.toggleClass('completed')
    });
  });
});
