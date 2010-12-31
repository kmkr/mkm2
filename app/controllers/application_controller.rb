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
    @random_assets = Asset.selected_best_images_sorted_randomly
  end

  def check_authorization
    begin
      user = User.find(session[:user_id])
    rescue ActiveRecord::RecordNotFound
      reset_session
    end 

    unless user 
      flash[:notice] = "Please log in"
      redirect_to(login_path)
    end 
  end
end
