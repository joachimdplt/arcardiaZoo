import React from 'react';

export default function AnimalFood({ feedType, feedQuantity }) {
    return (
        <div className="mt-4 bg-green-100 p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Recommandations d'alimentation</h3>
            <p><strong>Type d'alimentation:</strong> {feedType || 'Aucune recommandation'}</p>
            <p><strong>Quantité recommandée:</strong> {feedQuantity ? `${feedQuantity} g` : 'Non spécifié'}</p>
        </div>
    );
}