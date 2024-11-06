import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

const ReviewsClientShow = () => {
  const { approvedReviews } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    console.log('Avis approuvés reçus dans le composant:', approvedReviews);
  }, [approvedReviews]);

  const toggleReviews = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="reviewsClientShow" className="py-20 sm:py-30 md:py-40 mt-5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12" onMouseLeave={() => setIsOpen(false)}>
        <h2 
          onClick={toggleReviews} 
          className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 sm:mb-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-green-600"
        >
          Avis des visiteurs
        </h2>

        <div
          ref={reviewsRef}
          className={`mt-6 sm:mt-8 md:mt-12 transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="md:flex md:justify-center">
            <div className="w-full max-w-2xl sm:max-w-3xl transition-all duration-500 ease-in-out">
              {approvedReviews && approvedReviews.length > 0 ? (
                approvedReviews.map((review, index) => (
                  <div key={review.id} className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded shadow">
                    <p className="text-sm sm:text-base font-bold">{review.username}</p>
                    <p className="text-xs sm:text-sm md:text-base">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 sm:p-8">
                  <h2 className="text-base sm:text-lg md:text-2xl font-bold">Aucun avis pour le moment.</h2>
                  <p className="text-sm sm:text-base">Les avis validés apparaîtront ici.</p>
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