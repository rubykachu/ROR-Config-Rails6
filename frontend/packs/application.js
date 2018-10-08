import Routes from "./js-routes.js.erb";
window.Routes = Routes;

import $ from "jquery";
import Rails from "rails-ujs";
Rails.start();

import "global";
import "components/todo/todo";
