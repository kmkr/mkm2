class CountriesController < ApplicationController
  in_place_edit_for :country, :title
  before_filter :check_authorization, :except => [:show, :info]

  def show
    @country = Country.find(params[:id])

    respond_to do |format|
      format.html
      format.json {render :json => @country }
    end
  end

	def edit
    	@country = Country.find(params[:id])
		@continents = Continent.all
	end
	

  def info 
    positions = Country.country_info

    respond_to do |format|
      format.json {render :json => positions}
    end
  end

  def index
    @countries = Country.all
    @country = Country.new
    @continents = Continent.all
  end

	def update
    @country = Country.find(params[:id])

    if @country.update_attributes(params[:country])
      flash[:notice] = "Country updated"
      redirect_to countries_path
    else
      flash[:error] = "Unable to update article"
      redirect_to root_url
    end
  end

  def create
    @country = Country.create(params[:country])
  end

  def destroy
    @country = Country.find(params[:id])
    @id = @country.id
    @country.destroy
  end

  def set_country_title
    country = Country.find(params[:id])
    old_title = country.title
    country.title = params[:value]

    if country.save
      render :text => country.title
    else
      render :text => old_title
    end
  end
end
