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
            padding: '3rem',
            opacity: 1,
            transition: '0.5s',
        },
        cookiesText: {
            color: 'white',
            fontSize: '1.4rem',
            fontFamily: 'Arial, Helvetica, sans-serif',
        },
        cookiesBtn: {
            display: 'flex',
        },
        btn: {
            color: 'white',
            padding: '1rem',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
        },
        btnSuccess: {
            backgroundColor: '#1e2337',
            marginRight: '1rem',
        },
        btnDeny: {
            backgroundColor: 'grey',
            marginRight: '1rem',
        },
        btnSettings: {
            backgroundColor: '#555',
        }
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