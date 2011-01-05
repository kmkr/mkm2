# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  before_filter :initialize
  layout 'main'

  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details
  # Scrub parameters from the log
  filter_parameter_logging :password, :binary_data

  def initialize
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
