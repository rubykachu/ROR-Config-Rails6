Rails.application.routes.draw do
  root to: 'todos#index'
  resources :todos
  namespace :todo do
    resource :statuses, only: [:update, :destroy]
  end
end
