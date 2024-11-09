import { Restaurant, RestaurantDetail } from "@/types/Restaurant";
import axiosInstance from "./axiosInstance";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await axiosInstance.get<Restaurant[]>("/restaurants");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const fetchRestaurantById = async (
  id: number
): Promise<RestaurantDetail> => {
  try {
    const response = await axiosInstance.get<RestaurantDetail>(
      `/restaurants/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error);
    throw error;
  }
};

export const fetchRestaurantsByCuisine = async (
  cuisine: string
): Promise<Restaurant[]> => {
  try {
    const response = await axiosInstance.get<Restaurant[]>(
      `/restaurants?cuisine=${cuisine}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching restaurants with cuisine ${cuisine}:`, error);
    throw error;
  }
};
