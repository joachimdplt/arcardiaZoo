import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

const ReviewsClient = ({ isHovered }) => {
  const { data, setData, post, reset, processing, errors } = useForm({
    username: '',
    comment: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [sent, setSent] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isHovered]);

  useEffect(() => {
    if (isExpanded && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isExpanded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/reviews', {
      onSuccess: () => {
        reset();
        setSent(true);
        setResponseMessage('Merci pour votre message.');
      },
    });
  };

  return (
    <section
      id="reviewsClient"
      className="transition-all duration-500 ease-in-out flex flex-col items-center justify-center w-full"
      style={{ backgroundColor: '#848C42' }}
    >
      <h2
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-5xl mt-4 font-bold cursor-pointer text-white transition-transform duration-300"
      >
        Laisser votre avis
      </h2>

      <p className="mt-4 mb-10 text-white text-lg">
        Partagez votre expérience avec nous.
      </p>

      <div
        ref={formRef}
        className={`transition-all duration-500 ease-in-out w-full ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="md:flex md:justify-center">
          <div className="w-full max-w-3xl transform transition-all duration-500 ease-in-out">
            {!sent ? (
              <form className="p-12 bg-gray-100 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block text-gray-800 text-2xl font-bold mb-4" htmlFor="name">
                    Pseudo
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
                </div>
                <div className="mb-12">
                  <label className="block text-gray-800 text-2xl font-bold mb-4" htmlFor="comment">
                    Commentaire
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline h-60"
                    id="comment"
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    placeholder="Votre commentaire..."
                    required
                  ></textarea>
                  {errors.comment && <p className="text-red-500 mt-1">{errors.comment}</p>}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-[#38401A] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 text-lg"
                    type="submit"
                    disabled={processing}
                  >
                    {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </div>
                {responseMessage && (
                  <div className="mt-4 text-green-600">
                    {responseMessage}
                  </div>
                )}
              </form>
            ) : (
              <div className="p-12 bg-green-100 shadow-lg rounded-lg text-center">
                <h3 className="text-3xl font-bold text-green-700">Merci pour votre message !</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsClient;