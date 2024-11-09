import { Button } from "../ui/button";
import { Restaurant } from "@/types/Restaurant";
import { renderStars } from "@/components/renderStars";

interface RestaurantCardsProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurantId: number) => Promise<void>;
}

export default function RestaurantCards({
  restaurants,
  onSelectRestaurant,
}: RestaurantCardsProps) {
  

  return (
    <div className="grid grid-cols-4 gap-6 gap-y-14">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="flex flex-col h-full">
          <div
            className="h-[250px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${restaurant.image})` }}
          ></div>
          <span className="text-lg mt-5 line-clamp-2">{restaurant.name}</span>
          <div className="flex flex-row py-2">
            {renderStars(restaurant.rating)}
          </div>
          <div className="flex flex-row justify-between py-2 text-gray-500 text-[12px] mb-7">
            <span>
              {restaurant.cuisine} • {restaurant.price}
            </span>
            <span className="flex flex-row items-center gap-1">
              <div
                className={`h-2 w-2 rounded-full ${
                  restaurant.openStatus === "Open" ? "bg-ppopen" : "bg-ppclosed"
                }`}
              ></div>
              {restaurant.openStatus === "Open" ? "OPEN NOW" : "CLOSED"}
            </span>
          </div>
          <Button
            className="bg-ppaccent hover:bg-pphover rounded-none text-xs font-light py-5 mt-auto"
            variant="default"
            onClick={() => onSelectRestaurant(restaurant.id)}
          >
            LEARN MORE
          </Button>
        </div>
      ))}
    </div>
  );
}
