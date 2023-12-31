type RaterProps = {
    averageRating?: number;
    totalRatings?: number;
  }

export default function Rater({
    averageRating,
    totalRatings
}: RaterProps) {

return (
    <div className="flex mb-4">
        {averageRating !== undefined ? (
        <span className="flex items-center">
        <span className="text-gray-600 mr-2">{averageRating}</span>
        {[1, 2, 3, 4, 5].map((index) => (
            <svg
              key={index}
              fill={
                averageRating >= index - 0.5
                  ? 'currentColor'
                  : 'none'
              }
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
        ))}
        <span className="text-gray-600 ml-3">{totalRatings} Reviews</span>
        </span>
        ) : (
            <span className="text-gray-600">No rating available</span>
        )}

    </div>
);
};