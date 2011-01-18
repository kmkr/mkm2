Mkm2::Application.routes.draw do
  resources :users
  resources :sessions
  resources :countries do
    collection do
  get :info
  end
  
  end

  resources :articles do
    resources :assets
    resources :comments
    member do
      get :publish
      post :preview
    end
  end

  resources :assets do
    collection do
      get :random
    end
  
  end

  match '/logout' => 'sessions#destroy', :as => :logout
  match '/login' => 'sessions#new', :as => :login
  match '/register' => 'users#create', :as => :register
  match '/signup' => 'users#new', :as => :signup
  match '/' => 'page#index'
  match '/:controller(/:action(/:id))'
end

