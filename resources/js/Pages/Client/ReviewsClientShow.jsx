import React, { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';

const ReviewsClientShow = ({ isHovered }) => {
  const { approvedReviews } = usePage().props;
  const reviewsRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoveredState, setIsHoveredState] = useState(false);

  useEffect(() => {
    console.log('Avis approuvés reçus dans le composant:', approvedReviews);
  }, [approvedReviews]);

  const handleMouseEnter = () => {
    setIsHoveredState(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsHoveredState(false);
    setIsExpanded(false);
  };

  return (
    <section 
      id="reviewsClientShow" 
      className={`transition-all duration-500 ease-in-out w-full h-full flex items-center justify-center`}
      style={{ backgroundColor: isHoveredState ? 'white' : '#A6A26A' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
        <h2 
          className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110`}
          style={{ 
            color: isHoveredState ? '#38401A' : 'white', 
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' // Ombre portée
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsHoveredState(true)}
          onMouseLeave={() => setIsHoveredState(false)}
        >
          Avis des visiteurs
        </h2>

        <div
          ref={reviewsRef}
          className={`mt-6 sm:mt-8 md:mt-12 transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-[600px] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="md:flex md:justify-center">
            <div className="w-full max-w-2xl sm:max-w-3xl transition-all duration-500 ease-in-out">
              {approvedReviews && approvedReviews.length > 0 ? (
                approvedReviews.map((review) => (
                  <div key={review.id} className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded shadow">
                    <p className="text-sm sm:text-base font-bold">{review.username}</p>
                    <p className="text-xs sm:text-sm md:text-base">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 sm:p-8">
                  <h2 
                    className="text-base sm:text-lg md:text-2xl font-bold transition-colors duration-300"
                    style={{ 
                      color: isHoveredState ? '#38401A' : '#A6A26A', 
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.4)' // Ombre portée
                    }}
                  >
                    Aucun avis pour le moment.
                  </h2>
                  <p className="text-sm sm:text-base">
                    Les avis validés apparaîtront ici.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsClientShow;