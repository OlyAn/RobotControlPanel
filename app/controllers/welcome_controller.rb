# require "net/http"

class WelcomeController < ApplicationController
	def index
    @user_props = current_user&.attributes&.slice('first_name', 'last_name', 'email')
    @robot_props = {
      name: 'RoboCake',
      ip: "192.168.137.118"
    }
  end

  def update_user
    current_user.update_attributes!(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:last_name, :first_name, :email)
  end
end
