import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

const ContactsClient = ({ isHovered }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
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
    post('/api/contact/submit', {
      onSuccess: () => {
        reset();
        setSent(true);
        setResponseMessage('Merci pour votre message.');
      },
      onError: () => {
        setResponseMessage("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    });
  };

  return (
    <section
      id="contactsClient"
      className="transition-all duration-500 ease-in-out flex flex-col items-center justify-center w-full"
      style={{ backgroundColor: '#848C42' }}
    >
      <h2
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-5xl mt-6 font-bold cursor-pointer text-white transition-transform duration-300"
      >
        Nous contacter
      </h2>

      <p className="mt-4 mb-10 text-white text-lg">
        Pour toute question ou information, contactez-nous.
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
                <h3 className="text-gray-800 text-2xl font-bold mb-4">Informations Personnelles</h3>
                <input
                  type="text"
                  id="name"
                  placeholder="Nom complet"
                  required
                  onChange={e => setData('name', e.target.value)}
                  value={data.name}
                  className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                
                <input
                  type="email"
                  id="email"
                  placeholder="Adresse email"
                  required
                  onChange={e => setData('email', e.target.value)}
                  value={data.email}
                  className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                
                <h3 className="text-gray-800 text-2xl font-bold mb-4">Détails de la Demande</h3>
                <input
                  type="text"
                  id="subject"
                  placeholder="Sujet du message"
                  required
                  onChange={e => setData('subject', e.target.value)}
                  value={data.subject}
                  className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.subject && <p className="text-red-500">{errors.subject}</p>}
                
                <h3 className="text-gray-800 text-2xl font-bold mb-4">Votre Message</h3>
                <textarea
                  id="message"
                  placeholder="Votre message..."
                  required
                  onChange={e => setData('message', e.target.value)}
                  value={data.message}
                  className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline h-32"
                ></textarea>
                {errors.message && <p className="text-red-500">{errors.message}</p>}
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-[#38401A] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-transform duration-300 ease-in-out transform hover:scale-105 text-lg"
                  >
                    {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-12 bg-green-100 shadow-lg rounded-lg text-center">
                <h3 className="text-3xl font-bold text-green-700">{responseMessage}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsClient;