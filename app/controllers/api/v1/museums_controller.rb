class Api::V1::MuseumsController < Api::V1::BaseController
  before_action :set_museum, only: [ :show ]

  def index



    @museums = policy_scope(Museum)
  end

  def show

  end

  # def update
  #   @museum.update(museum_params)
  #   render :index
  # end

  private

  def museum_params
    params.permit(:latitude)
  end

    def set_museum
      @museums = Museum.all
      @museum = Museum.where( latitude: museum_params).first
      # @museum = @museums.where( id = 450).first
      # @museum = Museum.find(params[:id])
     # @museum = Museum.find_by latitude: 'museum_params'
      authorize @museum  # For Pundit
    end
end
