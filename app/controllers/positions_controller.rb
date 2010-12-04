class PositionsController < ApplicationController
  def index
    @positions = Country.fetch_positions

    respond_to do |format|
      format.json {render :json => @positions}
    end
  end
end
