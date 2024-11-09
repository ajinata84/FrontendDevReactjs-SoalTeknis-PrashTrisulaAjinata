import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import RestaurantCards from "@/components/RestaurantCards/RestaurantCards";
import {
  fetchRestaurantById,
  fetchRestaurants,
  fetchRestaurantsByCuisine,
} from "@/api/restaurantService";
import { Restaurant, RestaurantDetail } from "@/types/Restaurant";
import { restaurantCategories } from "@/util/restaurantCategories";
import { RestaurantModal } from "@/components/RestaurantModal/RestaurantModal";

export default function Home() {
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openNow, setOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantDetail>({
      id: 0,
      image: "",
      name: "",
      openStatus: "",
      price: "",
      rating: 0,
      reviews: [],
    });

  const isPriceInRange = (
    priceRange: string | null | undefined,
    selectedLevel: string
  ): boolean => {
    if (!priceRange) return false;

    const range = priceRange.replace(/\s/g, "").split("-");

    if (range.length === 1) {
      return range[0] === selectedLevel;
    }

    const startLevel = range[0].length;
    const endLevel = range[1].length;
    const selectedLength = selectedLevel.length;

    return selectedLength >= startLevel && selectedLength <= endLevel;
  };

  const applyFilters = (restaurants: Restaurant[]) => {
    if (!Array.isArray(restaurants)) {
      console.error("Invalid restaurants data:", restaurants);
      return [];
    }

    try {
      return restaurants.filter((restaurant) => {
        if (!restaurant) return false;

        const passesOpenFilter = !openNow || restaurant.openStatus === "Open";
        const passesPriceFilter =
          !selectedPrice || isPriceInRange(restaurant.price, selectedPrice);

        return passesOpenFilter && passesPriceFilter;
      });
    } catch (error) {
      console.error("Error applying filters:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let data: Restaurant[] = [];
        if (selectedCategory !== "All") {
          data = await fetchRestaurantsByCuisine(selectedCategory);
        } else {
          data = await fetchRestaurants();
        }
        setAllRestaurants(data);
        setFilteredRestaurants(applyFilters(data));
      } catch (error) {
        setError("Error fetching restaurants.");
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    setFilteredRestaurants(applyFilters(allRestaurants));
  }, [openNow, selectedPrice, allRestaurants]);

  const handleClearFilters = () => {
    setOpenNow(false);
    setSelectedPrice("");
    setSelectedCategory("All");
  };

  const handleSelectRestaurant = async (restaurantId: number) => {
    try {
      const restaurantDetail = await fetchRestaurantById(restaurantId);
      setSelectedRestaurant(restaurantDetail);
      handleSheetDialog();
    } catch (error) {
      console.error("Failed to fetch restaurant details:", error);
      setError("Failed to fetch restaurant details.");
    }
  };

  const handleSheetDialog = () => {
    setSheetOpen(!sheetOpen);
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <h1 className="text-6xl font-light text-gray-800">Restaurants</h1>
        <p className="text-gray-500 text-xl w-2/3">
          Discover the best restaurants around you based on cuisine, price, and
          availability.
        </p>

        <div className="flex flex-row justify-between border-solid border-0 border-y h-16 items-center">
          <div className="flex flex-row space-x-4 items-center">
            <span className="text-gray-500">Filter By:</span>

            <div className="flex flex-row items-center space-x-1 border-solid border-0 border-b h-10">
              <Checkbox
                id="isOpen"
                className="rounded-full border-gray-400"
                checked={openNow}
                onCheckedChange={(checked) => setOpenNow(!!checked)}
              />
              <label
                htmlFor="isOpen"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Open Now
              </label>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-solid border-0 border-b rounded-none w-20"
                >
                  {selectedPrice !== "" ? selectedPrice : "Price"}{" "}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={selectedPrice}
                  onValueChange={setSelectedPrice}
                >
                  <DropdownMenuRadioItem value="">Any</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$">$</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$$">$$</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$$$">$$$</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="$$$$">
                    $$$$
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-solid border-0 border-b rounded-none"
                >
                  {selectedCategory === "All" ? "Category" : selectedCategory}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                  {restaurantCategories.map((category) => (
                    <DropdownMenuRadioItem key={category} value={category}>
                      {category}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="outline"
            className="rounded-none px-10"
            onClick={handleClearFilters}
          >
            CLEAR ALL
          </Button>
        </div>

        <h1 className="text-3xl text-gray-700 font-light pt-10">
          All Restaurants
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredRestaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <RestaurantCards
            restaurants={filteredRestaurants}
            onSelectRestaurant={(id) => handleSelectRestaurant(id)}
          />
        )}
      </div>
      <RestaurantModal
        restaurantDetail={selectedRestaurant}
        isOpen={sheetOpen}
        changeHandler={setSheetOpen}
      />
    </>
  );
}
