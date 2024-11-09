import { Star } from "lucide-react";

export const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            strokeWidth={0.5}
            className="fill-ppaccent text-ppaccent"
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star strokeWidth={0.5} className="text-gray-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star strokeWidth={0.5} className="fill-ppaccent text-ppaccent" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} strokeWidth={0.5} className="text-gray-400" />
        );
      }
    }
    return stars;
  };