Rails.application.routes.draw do
  root "welcome#index"

  devise_for :users, module: "user"
  post "users/update", to: "welcome#update_user"

  get '*path', to: 'welcome#index'
end
