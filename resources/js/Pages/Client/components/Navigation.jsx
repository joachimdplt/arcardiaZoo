import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleNavLinkClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false); // Close the mobile menu after navigation
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[#38401A] text-white">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-2xl font-bold">Arcadia WILDLIFE</div>

        {/* Hamburger/Cross button for small screens */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-8 h-8 md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 -translate-x-1/2 -translate-y-1/2" : "-translate-y-1"
            }`}
          ></span>
          <span
            className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-x-1/2 -translate-y-1/2" : "translate-y-1"
            }`}
          ></span>
        </button>

        {/* Navbar for medium and larger screens */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#accueil" onClick={handleNavLinkClick} className="hover:text-gray-300">
            ACCUEIL
          </a>
          <a href="#servicesClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            SERVICES
          </a>
          <a href="#habitatsClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            HABITATS
          </a>
          <a href="#reviewsClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            AVIS
          </a>
          <a href="#contactsClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            CONTACT
          </a>

          {/* Log in with tooltip */}
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <a href="/login" target="_blank" className="hover:text-gray-300">
              LOG IN
            </a>
            {showTooltip && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max px-3 py-1 rounded bg-gray-700 text-white text-sm">
                Cet espace est réservé aux équipes du zoo
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay background when the mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div 
          className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-[#38401A] text-white flex flex-col space-y-4 py-6 px-4 overflow-y-auto transition-transform transform translate-x-0 z-50"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          <a href="#accueil" onClick={handleNavLinkClick} className="hover:text-gray-300">
            ACCUEIL
          </a>
          <a href="#servicesClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            SERVICES
          </a>
          <a href="#habitatsClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            HABITATS
          </a>
          <a href="#reviewsClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            AVIS
          </a>
          <a href="#contactsClient" onClick={handleNavLinkClick} className="hover:text-gray-300">
            CONTACT
          </a>
          <a href="/login" target="_blank" className="hover:text-gray-300">
            LOG IN
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;