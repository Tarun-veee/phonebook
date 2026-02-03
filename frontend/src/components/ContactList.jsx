import React from 'react';
import { FaEdit, FaTrash, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactList = ({ contacts, onEdit, onDelete }) => {
    if (contacts.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No contacts found. Add one to get started!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                            {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(contact)}
                                className="text-gray-400 hover:text-blue-500 transition"
                                title="Edit"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => onDelete(contact.id)}
                                className="text-gray-400 hover:text-red-500 transition"
                                title="Delete"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{contact.name}</h3>
                    <div className="space-y-2 text-gray-600 text-sm">
                        <div className="flex items-center space-x-2">
                            <FaPhone className="text-gray-400" />
                            <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-gray-400" />
                            <span>{contact.email}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
