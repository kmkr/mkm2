class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  before_filter :check_authorization, :except => [ :new, :create ]
  

  # render new.rhtml
  def new
    @user = User.new
  end
 
  def create
    logout_keeping_session!
    @user = User.new(params[:user])
    success = @user && @user.save
    if success && @user.errors.empty?
            # Protects against session fixation attacks, causes request forgery
      # protection if visitor resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset session
      self.current_user = @user # !! now logged in
      redirect_back_or_default('/')
      flash[:notice] = "Thanks for signing up!"
    else
      flash[:error]  = "We couldn't set up that account, sorry."
      render :action => 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    if user.update_attributes(params[:user])
      flash[:notice] = "User updated successfully"
      redirect_to root_path
    else
      flash[:error] = "Unable to update user"
      redirect_to :edit
    end
  end
end
