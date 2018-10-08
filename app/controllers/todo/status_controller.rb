class Todo::StatusController < ApplicationController
  def update
    batch_update_status
    export_response
  end

  def destroy
    batch_destroy
    export_response
  end

  private

  def batch_update_status
    ActiveRecord::Base.transaction do
      Todo.where(id: params[:id]).each { |todo| todo.update!(status: 1) }
    end
    @valid = true
  rescue ActiveRecord::RecordInvalid
    @valid = false
  end

  def batch_destroy
    ActiveRecord::Base.transaction do
      Todo.where(id: params[:id]).each { |todo| todo.destroy! }
    end
    @valid = true
  rescue ActiveRecord::RecordInvalid
    @valid = true
  end

  def export_response
    respond_to do |format|
      if @valid
        format.json { render json: { data: 'OK' }, status: :ok }
      else
        format.json { render json: { data: 'FAIL' }, status: :unprocessable_entity }
      end
    end
  end
end
