class ApplicationController < ActionController::Base
  protect_from_forgery 
  before_filter :initialize_app

  def initialize_app
    @continents = Continent.includes(:countries)
    @locations = User.all.collect {|user| { :user_name => user.login, :longitude => user.current_longitude, :latitude => user.current_latitude } } 
  end

  def check_authorization
    unless logged_in?
      reset_session
      session[:return_to] = request.fullpath
      flash[:notice] = "Please log in"
      redirect_to(login_path)
    end 
  end

  def logged_in?
    begin
      User.find(session[:user_id])
      true
    rescue ActiveRecord::RecordNotFound
      false
    end 
  end
end
