class Api::V1::MuseumsController < Api::V1::BaseController
  def index
    @museums = policy_scope(Museum)
  end
end
