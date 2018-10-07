class Todo::StatusController < ApplicationController
  def update
    todo = Todo.find(params[:id])
    todo.status = 1
    respond_to do |format|
      if todo.save
        format.json { render json: { data: todo }, status: :ok }
      else
        format.json { render json: todo.errors, status: :unprocessable_entity }
      end
    end
  end
end
