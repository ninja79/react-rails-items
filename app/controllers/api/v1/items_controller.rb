class Api::V1::ItemsController < Api::V1::BaseController
  def index
    render json: Item.all
  end

  def create
    render json: Item.create(item_params)
  end

  def destroy
     item = Item.find_by(id: params[:id])

    if item.destroy
      head :no_content
    else
      render json: { error: item.errors.messages }, status: 422
    end
    #render json: Item.destroy(params[:id])
  end

  def update
    item = Item.find(params["id"])
    item.update_attributes(item_params)
    render json: item
  end

  private

  def item_params
    params.require(:item).permit(:name, :description)
  end
end

