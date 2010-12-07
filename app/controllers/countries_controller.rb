class CountriesController < ApplicationController
  def show
    @country = Country.find(params[:id])

    respond_to do |format|
      format.html
      format.json {render :json => @country }
    end
  end

  def info 
    positions = Country.country_info
    countries = Country.all

    respond_to do |format|
      format.json {render :json => positions}
    end
  end
end
