export interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  price: string;
  openStatus: string;
}

export interface RestaurantDetail {
  id: number;
  name: string;
  rating: number;
  price: string;
  openStatus: string;
  image: string;
  reviews: Array<{
    text: string;
    url: string;
  }>;
}
