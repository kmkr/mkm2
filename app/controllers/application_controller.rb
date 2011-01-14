class ApplicationController < ActionController::Base
  protect_from_forgery 
  before_filter :initialize_app

  def initialize_app
    @continents = Continent.all
    @locations = User.all.collect {|user| { :longitude => user.current_longitude, :latitude => user.current_latitude } }
  end

  def check_authorization
    begin
      user = User.find(session[:user_id])
    rescue ActiveRecord::RecordNotFound
      reset_session
    end 

    unless user 
      session[:return_to] = request.request_uri
      flash[:notice] = "Please log in"
      redirect_to(login_path)
    end 
  end
end
