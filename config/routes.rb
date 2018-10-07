Rails.application.routes.draw do
  root to: 'todos#index'
  resources :todos do
    collection { resources :status, only: :update, controller: 'todo/status' }
  end
end
