import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';

const ContactsClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);

  // Utilisation de useForm pour gérer les données du formulaire
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // État pour gérer l'envoi du formulaire
  const [sent, setSent] = useState(false);

  // État pour afficher le message de confirmation
  const [responseMessage, setResponseMessage] = useState('');

  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/api/contact/submit', {
      onSuccess: () => {
        reset(); // Réinitialiser le formulaire après succès
        setSent(true); // Marquer comme envoyé
        setResponseMessage('Merci pour votre message.'); // Afficher le message de confirmation
      },
      onError: () => {
        setResponseMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
    });
  };

  return (
    <section id="contactsClient" className="py-40 bg-white relative">
      <div className="container mx-auto px-12">
        <h2 onClick={toggleForm} className="section-heading text-7xl font-bold text-center mb-20 cursor-pointer transform hover:scale-110 hover:text-green-600">
          Nous contacter
        </h2>

        <div ref={formRef} className={`transition-all duration-500 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="md:flex md:justify-center">
            <div className="w-full max-w-3xl">
              { !sent ? (
                <form className="p-12 bg-gray-100 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                  <h3 className="text-xl font-bold mb-4">Informations Personnelles</h3>
                  <input type="text" id="name" placeholder="Nom complet" required onChange={e => setData('name', e.target.value)} value={data.name} className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                  
                  <input type="email" id="email" placeholder="Adresse email" required onChange={e => setData('email', e.target.value)} value={data.email} className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                  
                  <h3 className="text-xl font-bold mb-4">Détails de la Demande</h3>
                  <input type="text" id="subject" placeholder="Sujet du message" required onChange={e => setData('subject', e.target.value)} value={data.subject} className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  {errors.subject && <p className="text-red-500">{errors.subject}</p>}
                  
                  <h3 className="text-xl font-bold mb-4">Votre Message</h3>
                  <textarea id="message" placeholder="Votre message..." required onChange={e => setData('message', e.target.value)} value={data.message} className="mb-4 p-3 w-full border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"></textarea>
                  {errors.message && <p className="text-red-500">{errors.message}</p>}
                  
                  <button type="submit" disabled={processing} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
                    {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              ) : (
                <div className="p-12 bg-green-100 shadow-lg rounded-lg text-center">
                  <h3 className="text-3xl font-bold text-green-700">{responseMessage}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsClient;