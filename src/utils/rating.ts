export function calculateRating(reviews: { rating: number }[]) {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return Number(avg.toFixed(1));
}

export function getFilledStars(rating: number) {
  return Math.floor(rating);
}

export function formatRating(rating: number) {
  return rating.toFixed(1);
}