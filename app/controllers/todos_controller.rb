class TodosController < ApplicationController
  def index
    @todo  = Todo.new
    @todos = Todo.order(id: :asc)
  end

  def create
    todo = Todo.new(permit_params)
    respond_to do |format|
      if todo.save
        format.json { render json: { data: todo }, status: :ok }
      else
        format.json { render json: todo.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    todo = Todo.find_by(id: params[:id])
    todo.content = params[:content]
    respond_to do |format|
      if todo.save
        format.json { render json: { data: todo }, status: :ok }
      else
        format.json { render json: todo.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    todo = Todo.find_by(id: params[:id])
    respond_to do |format|
      if todo.destroy
        format.json { render json: { data: todo }, status: :ok }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  private

  def permit_params
    params.require(:todo).permit(:content)
  end
end
