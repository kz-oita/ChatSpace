Rails.application.routes.draw do
<<<<<<< Updated upstream
  
  root "messages#index"
=======

  devise_for :users
  root to: "messages#index"
  resources :users, only: [:edit, :update]
>>>>>>> Stashed changes
end
