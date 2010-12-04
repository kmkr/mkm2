class CountriesController < ApplicationController
  def show
    @country = Country.find(params[:id])

    respond_to do |format|
      format.json {render :json => @country }
    end
  end
end
