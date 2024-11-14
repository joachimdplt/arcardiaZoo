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

const Home = () => {
    const { services, habitats, animals, approvedReviews } = usePage().props;
    const [activeSection, setActiveSection] = useState(null);

    const handleMouseEnter = (section) => {
        setActiveSection(section);
    };

    const handleMouseLeave = () => {
        setActiveSection(null); // Reset to initial state on mouse leave
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="pt-16 flex-grow"> 
                <Accueil services={services} habitats={habitats} animals={animals} approvedReviews={approvedReviews} />

                {/* Services and Habitats sections */}
                <div className="flex flex-col md:flex-row w-full min-h-screen">
                    <div
                        className={`transition-all duration-500 ease-in-out ${
                            activeSection === 'services' ? 'w-full' : 'w-full md:w-1/2'
                        } flex justify-center`}
                        onMouseEnter={() => handleMouseEnter('services')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ServicesClient />
                    </div>
                    <div
                        className={`transition-all duration-500 ease-in-out ${
                            activeSection === 'habitats' ? 'w-full' : 'w-full md:w-1/2'
                        } flex justify-center`}
                        onMouseEnter={() => handleMouseEnter('habitats')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <HabitatsClient isHovered={activeSection === 'habitats'} />
                    </div>
                </div>

                {/* Reviews and Contacts sections */}
                <div className="flex flex-col md:flex-row w-full">
                    <div 
                        className={`flex-1 flex justify-center transition-all duration-500 ease-in-out ${
                            activeSection === 'reviews' ? 'w-full' : 'w-full md:w-1/2'
                        }`}
                        onMouseEnter={() => handleMouseEnter('reviews')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <ReviewsClient isHovered={activeSection === 'reviews'} />
                    </div>
                    <div 
                        className={`flex-1 flex justify-center transition-all duration-500 ease-in-out ${
                            activeSection === 'contacts' ? 'w-full' : 'w-full md:w-1/2'
                        }`}
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