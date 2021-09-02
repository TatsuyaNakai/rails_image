class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, comment: '名前'
      t.text :image_data, comment: '画像データの名前'

      t.timestamps
    end
  end
end
