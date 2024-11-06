import React from 'react';
import { Link } from '@inertiajs/react';


const Contact = ({ messages }) => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold mb-4">Messages de Contact</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {messages.map((message) => (
                    <div key={message.id} className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            {message.name}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <p>Email: {message.email}</p>
                            <p>Subject: {message.subject || 'No Subject'}</p>
                            <p>Message: {message.message}</p>
                        </dd>
                    </div>
                ))}
                <div className="mt-6">
                    <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Retour au tableau de bord
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default Contact;