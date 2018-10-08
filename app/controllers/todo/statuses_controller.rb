class Todo::StatusesController < ApplicationController
  def update
    batch_update_status
    export_response(todos.reload.as_json)
  end

  def destroy
    batch_destroy
    export_response(todos.pluck(:id))
  end

  private

  def todos
    @todos ||= Todo.where(id: Array(params[:ids]))
  end

  def batch_update_status
    ActiveRecord::Base.transaction do
      todos.each { |todo| todo.update!(status: params[:completed].to_i.zero?) }
    end
    @valid = true
  rescue ActiveRecord::RecordInvalid
    @valid = false
  end

  def batch_destroy
    ActiveRecord::Base.transaction do
      todos.each { |todo| todo.destroy! }
    end
    @valid = true
  rescue ActiveRecord::RecordInvalid
    @valid = true
  end

  def export_response(data = 'OK')
    respond_to do |format|
      if @valid
        format.json { render json: { data: data }, status: :ok }
      else
        format.json { render json: { data: 'FAIL' }, status: :unprocessable_entity }
      end
    end
  end
end
