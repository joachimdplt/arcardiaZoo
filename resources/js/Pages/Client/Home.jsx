import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Navigation from './components/Navigation';
import ServicesClient from './ServicesClient';
import HabitatsClient from './HabitatsClient';
import ReviewsClient from './ReviewsClient';
import ContactsClient from './ContactsClient';
import Accueil from './components/Accueil';
import CookieBanner from './CookieBanner';
import Footer from './Footer';
import useInViewAnimation from './useInViewAnimation';

const Home = () => {
    const { services, habitats, animals, approvedReviews } = usePage().props;
    const [activeSection, setActiveSection] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const [servicesRef, isServicesInView] = useInViewAnimation(0.5);
    const [habitatsRef, isHabitatsInView] = useInViewAnimation(0.5);
    const [reviewsRef, isReviewsInView] = useInViewAnimation(0.5);
    const [contactsRef, isContactsInView] = useInViewAnimation(0.5);

    // Détecter les petits écrans
    useEffect(() => {
        const updateScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const handleMouseEnter = (section) => {
        if (!activeSection) setActiveSection(section); // Fixer la section active si aucune n'est sélectionnée
    };

    const handleMouseLeave = () => {
        // Supprimer cette ligne pour garder la section ouverte
    };

    const selectSection = (section) => {
        setActiveSection(section); // Fixer la section sélectionnée
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="pt-8 pb-8 flex-grow">
                <Accueil services={services} habitats={habitats} animals={animals} approvedReviews={approvedReviews} />

                <div className="flex flex-col md:flex-row w-full min-h-[70vh]">
                    <div
                        ref={servicesRef}
                        className={`flex justify-center items-center transition-all ${
                            isSmallScreen || isServicesInView || activeSection === 'services'
                                ? 'opacity-100 translate-x-0 w-full'
                                : 'opacity-0 translate-x-10 w-full md:w-1/2'
                        } py-8 px-4`}
                        style={{
                            transitionDuration: isSmallScreen || activeSection === 'services' ? '0ms' : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('services')}
                        onClick={() => selectSection('services')}
                    >
                        <ServicesClient />
                    </div>

                    <div
                        id="habitats"
                        ref={habitatsRef}
                        className={`flex justify-center items-center transition-all ${
                            isHabitatsInView || activeSection === 'habitats'
                                ? 'opacity-100 translate-x-0 w-full'
                                : 'opacity-0 translate-x-10 w-full md:w-1/2'
                        } py-8 px-4`}
                        style={{
                            transitionDuration: isHabitatsInView || activeSection === 'habitats' ? '700ms' : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('habitats')}
                        onClick={() => selectSection('habitats')}
                    >
                        <HabitatsClient isHovered={activeSection === 'habitats'} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full">
                    <div
                        ref={reviewsRef}
                        className={`flex-1 flex justify-center items-center transition-all ${
                            isReviewsInView || activeSection === 'reviews'
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10'
                        } py-8 px-4`}
                        style={{
                            transitionDuration: isReviewsInView || activeSection === 'reviews' ? '700ms' : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('reviews')}
                        onClick={() => selectSection('reviews')}
                    >
                        <ReviewsClient isHovered={activeSection === 'reviews'} />
                    </div>
                    <div
                        ref={contactsRef}
                        className={`flex-1 flex justify-center items-center transition-all ${
                            isContactsInView || activeSection === 'contacts'
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10'
                        } py-8 px-4`}
                        style={{
                            transitionDuration: isContactsInView || activeSection === 'contacts' ? '700ms' : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('contacts')}
                        onClick={() => selectSection('contacts')}
                    >
                        <ContactsClient isHovered={activeSection === 'contacts'} />
                    </div>
                </div>

                <CookieBanner />
            </main>
            <Footer />
        </div>
    );
};

export default Home;