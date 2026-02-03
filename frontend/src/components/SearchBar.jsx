import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                placeholder="Search contacts..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
    );
};

export default SearchBar;
