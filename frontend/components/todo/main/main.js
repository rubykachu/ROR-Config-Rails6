import "./main.css";
import * as Fn from "./function";

$(document).ready(function() {
  $(document).on("dblclick", ".js-label-item", function() {
    $(this).closest("li").addClass("editing");

  }).on("change", ".js-edit-item", function() {
    let $parent = $(this).parent("li"),
        value = $(this).val(),
        url = $parent.data("url");

    $parent.removeClass("editing");
    $parent.find(".js-label-item").html(value);
    Fn.updateTodo(value, url);

  }).on("click", ".js-destroy-item", function() {
    let $parent = $(this).closest("li"),
        url = $parent.data("url");
    Fn.deleteTodo(url).done(function() {
      $parent.remove();
    });

  }).on("click", ".js-toggle-status", function() {
    let $parent = $(this).closest("li"),
        url = $parent.data("url-status");
    Fn.updateCompletedTodo(url).done(function() {
      $parent.toggleClass('completed');
    });
  });
});
