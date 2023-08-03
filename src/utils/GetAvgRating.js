export default function GetAvgRating(ratingArr) {
    if(ratingArr?.length === 0) {
        return 0;
    }
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
        acc += curr.rating;
        return acc;
    }, 0);

    const multiplier = 10;
    const avgRating = 
    Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
  
    return avgRating
}