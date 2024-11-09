import { RestaurantDetail } from "@/types/Restaurant";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { renderStars } from "@/components/renderStars";

type RestaurantModalProps = {
  restaurantDetail: RestaurantDetail;
  isOpen: boolean;
  changeHandler: (open: boolean) => void;
};

export function RestaurantModal({
  restaurantDetail,
  isOpen,
  changeHandler,
}: RestaurantModalProps) {
  const { name, rating, reviews, image } = restaurantDetail;

  return (
    <Dialog open={isOpen} onOpenChange={changeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">{name}</DialogTitle>
        </DialogHeader>
        <img src={image} alt={name} className="mx-auto pb-4" />
        <div>
          <span className="flex flex-row font-semibold">
            Rating: {renderStars(rating)}
          </span>
          <div className="flex flex-col ">
            <span className="font-semibold">Reviews:</span>
            {reviews.map(
              (review, index) =>
                review != undefined && (
                  <div key={index} className="my-1">
                    <p>• {review.text}</p>
                  </div>
                )
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
