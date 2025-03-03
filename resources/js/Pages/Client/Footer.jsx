import React from 'react';

const Footer = () => {
  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="text-center py-12 bg-[#38401A] text-white">
      <a
        href="#accueil"  // Ce lien cible la section d'accueil
        onClick={(e) => handleNavClick(e, "accueil")}
        className="flex items-center justify-center mb-8 text-4xl font-semibold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-green-400"
      >
        Arcadia WildLife
      </a>

      {/* Liens de navigation */}
      <nav className="flex justify-center space-x-8 mb-4">
        <a
          href="#accueil"
          onClick={(e) => handleNavClick(e, "accueil")}
          className="text-gray-300 hover:text-white"
        >
          ACCUEIL
        </a>
        <a
          href="#servicesClient"
          onClick={(e) => handleNavClick(e, "servicesClient")}
          className="text-gray-300 hover:text-white"
        >
          SERVICES
        </a>
        <a
          href="#habitatsClient"
          onClick={(e) => handleNavClick(e, "habitatsClient")}
          className="text-gray-300 hover:text-white"
        >
          HABITATS
        </a>
        <a
          href="/login"
          target="_blank"
          className="text-gray-300 hover:text-white"
        >
          LOG IN
        </a>
      </nav>

      {/* Lien vers les mentions légales et GitHub */}
      <div className="mt-8 flex justify-center items-center space-x-4">
        <a
          href="/mentions-legales"
          className="text-gray-300 hover:text-gray-200 text-sm"
        >
          Mentions légales
        </a>
        <a
          href="https://github.com/joakmannn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-200"
          aria-label="GitHub"
        >
          {/* Icône GitHub */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0a12 12 0 0 0-3.797 23.403c.6.113.82-.258.82-.575v-2.014c-3.338.724-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.082-.73.082-.73 1.204.085 1.837 1.235 1.837 1.235 1.07 1.83 2.808 1.302 3.492.995.108-.775.418-1.302.762-1.602-2.665-.304-5.467-1.333-5.467-5.933 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.116-3.176 0 0 1.008-.323 3.3 1.23a11.48 11.48 0 0 1 6 0c2.291-1.554 3.299-1.23 3.299-1.23.652 1.652.241 2.873.118 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.922.43.37.823 1.103.823 2.222v3.293c0 .319.218.694.824.574A12 12 0 0 0 12 0z" />
          </svg>
        </a>
      </div>

      {/* Copyright */}
      <span className="block text-sm text-center text-gray-200 mt-4">
        © 2024 ajd-world.com All Rights Reserved. Built with React and Laravel
      </span>
    </footer>
  );
};

export default Footer;