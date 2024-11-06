import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';

const ReviewsClient = () => {
  const { data, setData, post, reset, processing, errors } = useForm({
    username: '',
    comment: '',
  });

  // État pour gérer l'ouverture/fermeture du formulaire
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Référence pour le formulaire
  const formRef = useRef(null);

  // Fonction pour basculer l'ouverture du formulaire
  const toggleForm = () => {
    setIsOpen(!isOpen);

    // Remonter vers le formulaire si on l'ouvre
    if (!isOpen) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Délai court pour que le formulaire ait le temps de s'afficher
    }
  };

  // Soumission du formulaire
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
    <section id="reviewsClient" className="py-40 bg-white relative">
      <div className="container mx-auto px-12">
        <h2 
          onClick={toggleForm} 
          className="section-heading text-7xl font-bold text-center mb-20 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-green-600"
        >
          Laisser votre avis 
        </h2>

        <div
          ref={formRef}
          className={`mt-12 transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="md:flex md:justify-center">
            <div className="w-full max-w-3xl transform transition-all duration-500 ease-in-out">
              {!sent ? (
                <form className="p-12 bg-gray-100 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label className="block text-gray-700 text-2xl font-bold mb-4" htmlFor="name">
                      Pseudo
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    <label className="block text-gray-700 text-2xl font-bold mb-4" htmlFor="comment">
                      Commentaire
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-60"
                      id="comment"
                      value={data.comment}
                      onChange={(e) => setData('comment', e.target.value)}
                      placeholder="Votre commentaire..."
                      required
                    ></textarea>
                    {errors.comment && <p className="text-red-500 mt-1">{errors.comment}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 text-xl"
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
      </div>
    </section>
  );
};

export default ReviewsClient;