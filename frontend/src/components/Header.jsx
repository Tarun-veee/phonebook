import React from 'react';
import { FaAddressBook } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white shadow-md py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FaAddressBook className="text-2xl" />
                    <h1 className="text-xl font-bold">Phonebook App</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
