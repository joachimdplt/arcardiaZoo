import React, { useState } from 'react';
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

    const [servicesRef, isServicesInView] = useInViewAnimation(0.5); 
    const [habitatsRef, isHabitatsInView] = useInViewAnimation(0.5);
    const [reviewsRef, isReviewsInView] = useInViewAnimation(0.5);
    const [contactsRef, isContactsInView] = useInViewAnimation(0.5);

    const handleMouseEnter = (section) => {
        setActiveSection(section);
    };

    const handleMouseLeave = () => {
        setActiveSection(null);
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
                            isServicesInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        } ${activeSection === 'services' ? 'w-full' : 'w-full md:w-1/2'} py-8 px-4`}
                        style={{
                            transitionDuration: isServicesInView ? (window.innerWidth < 768 ? '1500ms' : '700ms') : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('services')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ServicesClient />
                    </div>
                    
                    <div
                        ref={habitatsRef}
                        className={`flex justify-center items-center transition-all ${
                            isHabitatsInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        } ${activeSection === 'habitats' ? 'w-full' : 'w-full md:w-1/2'} py-8 px-4`}
                        style={{
                            transitionDuration: isHabitatsInView ? (window.innerWidth < 768 ? '1500ms' : '700ms') : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('habitats')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <HabitatsClient isHovered={activeSection === 'habitats'} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full">
                    <div
                        ref={reviewsRef}
                        className={`flex-1 flex justify-center items-center transition-all ${
                            isReviewsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        } py-8 px-4`}
                        style={{
                            transitionDuration: isReviewsInView ? (window.innerWidth < 768 ? '1500ms' : '700ms') : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('reviews')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ReviewsClient isHovered={activeSection === 'reviews'} />
                    </div>
                    <div
                        ref={contactsRef}
                        className={`flex-1 flex justify-center items-center transition-all ${
                            isContactsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        } py-8 px-4`}
                        style={{
                            transitionDuration: isContactsInView ? (window.innerWidth < 768 ? '1500ms' : '700ms') : '700ms',
                        }}
                        onMouseEnter={() => handleMouseEnter('contacts')}
                        onMouseLeave={handleMouseLeave}
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