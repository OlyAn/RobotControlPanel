# require "net/http"

class WelcomeController < ApplicationController
	def index
    @hello_world_props = { name: "Stranger" }
    # uri = URI("http://192.168.0.102:8080/snapshot?topic=/raspicam_node/image")
    # a = Net::HTTP.get_response(uri) 

    # binding.pry
  end
end
