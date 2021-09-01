class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, null: true, comment: '名前'
      # ここでnull:trueが必要な理由は何か。
      t.text :image_data, comment: '画像データの名前'

      t.timestamps
    end
  end
end
