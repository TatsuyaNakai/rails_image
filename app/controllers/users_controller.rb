class UsersController < ApplicationController

  def show
    user=User.find(params[:id])
    render json:user
  end

  def create
    user=User.create!(user_params)
    # モデルを作成してないのにどうやってcreateをするのか。。

    
    bucket= Aws::S3::Resource.new(
      :region=> 'ap-northeast-1',
      :access_key_id => ENV['AWS_ACCCES_KEY'],
      :secret_access_key => ENV['AWS_ACCCES_SECRET_KEY'],
    ).buket('sampleimage01')
    buket.object("user_id_#{user.id}_profile_image").put(:body =>params[:profile_image])
    render json: user
  end

  private
  def user_params
    params.permit(:name, :image_data)
    # name, image_dataカラムだけを許可する。
  end
end