# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  before_filter :initialize
  layout 'main'

  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details
  # Scrub sensitive parameters from your log
  filter_parameter_logging :password, :binary_data

  def initialize
    @continents = Continent.all
    @random_assets = Asset.selected_best_images_sorted_randomly
  end
end
