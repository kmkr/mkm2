class CountriesController < ApplicationController
  def show
    @country = Country.find(params[:id])

    respond_to do |format|
      format.html 
      format.xml { render :xml => @country }
    end
  end
end
