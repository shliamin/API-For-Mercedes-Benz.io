Rails.application.routes.draw do
  devise_for :users
  # [...]
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :museums, only: [ :index, :show]
    end
  end
  root to: 'pages#home'

  # get 'pages#home', to: 'museums#index'

end
