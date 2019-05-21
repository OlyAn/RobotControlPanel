# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.

ReactOnRails.configure do |config|
  config.build_production_command = "RAILS_ENV=production NODE_ENV=production bin/webpack"
  config.build_test_command = "RAILS_ENV=test bin/webpack"
end
