import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        const cookiesRefused = localStorage.getItem('cookiesRefused');
        
        if (!cookiesAccepted && !cookiesRefused) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setIsVisible(false);
    };

    const handleRefuse = () => {
        localStorage.setItem('cookiesRefused', 'true');
        setIsVisible(false);
    };

    const handleSettings = () => {
        // Redirecting to the mentions légales page
        window.location.href = '/mentions-legales';
    };

    const styles = {
        cookies: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'grey',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            opacity: 1,
            transition: '0.5s',
            zIndex: 9999,
        },
        cookiesText: {
            color: 'white',
            fontSize: '1.4rem',
            fontFamily: 'Arial, Helvetica, sans-serif',
            flex: 1,  // Allow text to take up available space
            marginRight: '1rem',  // Add spacing between the text and the buttons
        },
        cookiesBtn: {
            display: 'flex',
            flexWrap: 'wrap',  // Allow buttons to stack on smaller screens
            gap: '0.5rem', // Add space between buttons
        },
        btn: {
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',  // Make font size more adaptable
        },
        btnSuccess: {
            backgroundColor: '#1e2337',
        },
        btnDeny: {
            backgroundColor: 'grey',
        },
        btnSettings: {
            backgroundColor: '#555',
        },
    };

    return (
        isVisible && (
            <div style={styles.cookies}>
                <div style={styles.cookiesText}>
                    <p>En poursuivant, vous acceptez l'utilisation des cookies par le site afin de vous proposer des contenus adaptés et réaliser des statistiques.</p>
                </div>
                <div style={styles.cookiesBtn}>
                    <button style={{ ...styles.btn, ...styles.btnSuccess }} onClick={handleAccept}>
                        Accepter les cookies
                    </button>
                    <button style={{ ...styles.btn, ...styles.btnDeny }} onClick={handleRefuse}>
                        Refuser les cookies
                    </button>
                    <button style={{ ...styles.btn, ...styles.btnSettings }} onClick={handleSettings}>
                        Paramètres des cookies
                    </button>
                </div>
            </div>
        )
    );
};

export default CookieBanner;