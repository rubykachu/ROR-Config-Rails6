import "./main.css";
import * as Todo from "components/todo/todo";

const completedAll = () => {
  let ids = Todo.idsNotComplete();
  $('.js-todo-list li:not(.completed)').addClass("completed")
                                       .find(".js-toggle-completed")
                                       .prop("checked", true);
  Todo.completed( ids, 0 );
};

const unCompleteAll = () => {
  let ids = Todo.idsCompleted();
  $('.js-todo-list li').removeClass("completed")
                       .find(".js-toggle-completed")
                       .prop("checked", false);
                       Todo.idsCompleted();
  Todo.completed( ids, 1 );
}

$(document).ready(function() {
  $(document).on("dblclick", ".js-label-item", function() {
    $(this).closest("li").addClass("editing").children('.js-edit-item').focus();

  }).on("focusout", ".js-edit-item", function() {
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
      $parent.toggleClass("completed");
    });

  }).on("click", ".js-toggle-all-completed", function() {
    let $this = $(this);
    $this.is(':checked') ? completedAll() : unCompleteAll()
  });
});
