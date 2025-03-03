import React from 'react';

const LegalMentions = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Bouton de retour */}
      <button
        onClick={() => window.history.back()}
        className="mb-8 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded"
      >
        ← Retour
      </button>

      <h1 className="text-4xl font-bold text-center mb-8">Mentions Légales</h1>

      {/* Informations générales */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Informations Générales</h2>
        <p className="text-gray-700 leading-7 mb-4">
          Ce site web, accessible à l'adresse [arcadia-wildlife.com], est édité par **Arcadia Wildlife**, une société
          [Type de société : SAS, SARL, etc.] au capital de [montant en euros] €, immatriculée au RCS de [ville] sous
          le numéro [numéro d'immatriculation], dont le siège social est situé au [adresse complète].
        </p>
        <p className="text-gray-700 leading-7 mb-4">
          Directeur de publication : [Nom du directeur]
        </p>
        <p className="text-gray-700 leading-7 mb-4">
          Hébergement : Ce site est hébergé par Hostinger International Ltd., situé à 61 Lordou Vironos Street, 6023 Larnaca, Chypre.
        </p>
      </section>

      {/* Propriété intellectuelle */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Propriété Intellectuelle</h2>
        <p className="text-gray-700 leading-7 mb-4">
          L'ensemble des contenus présents sur ce site, incluant les textes, images, graphismes, logos, icônes, sons,
          logiciels, sont la propriété exclusive de **Arcadia Wildlife**, à l'exception des marques, logos ou contenus
          appartenant à d'autres sociétés partenaires ou auteurs.
        </p>
        <p className="text-gray-700 leading-7 mb-4">
          Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de
          ces différents éléments est strictement interdite sans l'accord exprès par écrit de **Arcadia Wildlife**.
        </p>
      </section>

      {/* Protection des Données Personnelles */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Protection des Données Personnelles</h2>
        <p className="text-gray-700 leading-7 mb-4">
          La confidentialité et la sécurité de vos données personnelles sont notre priorité. Voici comment nous collectons,
          utilisons et protégeons les informations que vous nous transmettez via nos formulaires.
        </p>

        {/* Formulaire d'Avis */}
        <h3 className="text-xl font-semibold mb-2">Formulaire d’Avis</h3>
        <p className="text-gray-700 leading-7 mb-4">
          Lorsque vous laissez un avis sur notre site, nous recueillons les informations suivantes :
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Pseudonyme : Le pseudonyme de votre choix pour publier votre avis de manière anonyme.</li>
          <li>Avis : Votre commentaire ou retour d’expérience.</li>
        </ul>

        {/* Formulaire de Contact */}
        <h3 className="text-xl font-semibold mb-2">Formulaire de Contact</h3>
        <p className="text-gray-700 leading-7 mb-4">
          Lors de votre prise de contact via notre formulaire, nous collectons :
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Nom : Votre nom, utilisé pour vous identifier dans notre correspondance.</li>
          <li>Adresse e-mail : Votre adresse e-mail, pour vous répondre directement.</li>
          <li>Message : Le contenu de votre message ou demande.</li>
        </ul>
        <p className="text-gray-700 leading-7 mb-4">
          Ces informations sont uniquement utilisées pour traiter votre demande et ne sont jamais partagées avec des tiers. Nous les protégeons en accord avec notre politique de confidentialité.
        </p>

        {/* Sécurité des Données */}
        <h3 className="text-xl font-semibold mb-2">Sécurité des Données</h3>
        <p className="text-gray-700 leading-7 mb-4">
          Nous mettons en place des mesures de sécurité adaptées pour protéger vos informations personnelles contre tout accès non autorisé, ainsi que contre la divulgation, modification ou destruction non désirées.
        </p>

        {/* Vos Droits */}
        <h3 className="text-xl font-semibold mb-2">Vos Droits</h3>
        <p className="text-gray-700 leading-7 mb-4">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez le droit d’accéder, de rectifier, de supprimer ou de limiter l’usage de vos données personnelles. Pour exercer ces droits, contactez-nous à l’adresse suivante : jose@arcadia.com. Nous répondrons à vos demandes dans les meilleurs délais, en respectant votre vie privée.
        </p>
      </section>

      {/* Utilisation des Cookies */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Utilisation des Cookies</h2>
        <p className="text-gray-700 leading-7 mb-4">
          Ce site utilise des cookies pour améliorer votre expérience de navigation, analyser le trafic et personnaliser le contenu. Les cookies sont de petits fichiers stockés sur votre appareil lorsque vous visitez un site, permettant au site de se souvenir de vos préférences et de vous reconnaître lors de vos prochaines visites.
        </p>
        <p className="text-gray-700 leading-7 mb-4">
          Pour plus de détails, consultez notre politique complète de gestion des cookies et de protection des données.
        </p>
      </section>

      {/* Limitation de Responsabilité */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitation de Responsabilité</h2>
        <p className="text-gray-700 leading-7 mb-4">
          Les informations contenues sur ce site sont aussi précises que possible et le site est régulièrement mis à jour,
          mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. En conséquence, l'utilisateur
          reconnaît utiliser ces informations sous sa responsabilité exclusive.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-700 leading-7 mb-4">
          Pour toute question, vous pouvez nous contacter par email à : jose@arcadia.com.
        </p>
      </section>
    </div>
  );
};

export default LegalMentions;