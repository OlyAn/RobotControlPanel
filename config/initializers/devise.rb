# frozen_string_literal: true

# Use this hook to configure devise mailer, warden hooks and so forth.
Devise.setup do |config|
  config.mailer_sender = 'robot-control-panel@help.com'
  require 'devise/orm/active_record'

  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]


  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 11

  config.reconfirmable = false
  config.expire_all_remember_me_on_sign_out = true

  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  config.reset_password_within = 6.hours
  config.sign_out_via = :get
  config.sign_in_after_change_password = true

  # ==> OmniAuth
  # Add a new OmniAuth provider. Check the wiki for more information on setting
  # up on your models and hooks.
  # config.omniauth :github, 'APP_ID', 'APP_SECRET', scope: 'user,public_repo'

  # When using OmniAuth, Devise cannot automatically set OmniAuth path,
  # so you need to do it manually. For the users scope, it would be:
  # config.omniauth_path_prefix = '/my_engine/users/auth'
end
