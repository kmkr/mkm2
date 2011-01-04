class CountriesController < ApplicationController
  before_filter :check_authorization, :except => [:show, :info]

  def show
    @country = Country.find(params[:id])

    respond_to do |format|
      format.html
      format.json {render :json => @country }
    end
  end

  def info 
    positions = Country.country_info

    respond_to do |format|
      format.json {render :json => positions}
    end
  end

  def edit 
    @countries = Country.all
  end
end
