import "./footer.css";
import * as Todo from "components/todo/todo";

const stateUrl = param => {
  return window.location.hash.includes(param);
};

const removeItem = result => {
  $.each(result.data, function(index, value) {
    $('.js-todo-list li[data-id="' + value +'"]').remove();
  });
};

const resetSelected = element => {
  $('.js-filters a').removeClass('selected');
  console.log(element);
  element.addClass('selected');
};

const showCompleted = element => {
  resetSelected( element );
  $('.js-todo-list li').show();
  $('.js-todo-list li:not(.completed)').hide();
};

const showActive = element => {
  resetSelected( element );
  $('.js-todo-list li').show();
  $('.js-todo-list li.completed').hide();
};

const showAll = element => {
  resetSelected( element );
  $('.js-todo-list li').show();
};

const showByUrl = () => {
  if ( stateUrl('completed') ) {
    showCompleted( $('.js-completed') );
  } else if ( stateUrl('active') ) {
    showActive( $('.js-active') );
  } else {
    showAll( $('.js-all') );
  }
};

$(document).ready(function() {
  showByUrl();

  $('.js-clear-completed').on('click', function() {
    let ids = Todo.idsCompleted();
    Todo.clearCompleted(ids).done(function(result) {
      removeItem(result);
    });
  });

  $('.js-completed').on('click', function() {
    showCompleted( $(this) );
  });

  $('.js-active').on('click', function() {
    showActive( $(this) );
  });

  $('.js-all').on('click', function() {
    showAll( $(this));
  });
});
