class CreateTableTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :content
      t.integer :status, default: 0
      t.timestamps null: true
    end
  end
end
