import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import { getContacts, addContact, updateContact, deleteContact, searchContacts } from './services/api';
import { FaPlus } from 'react-icons/fa';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm);
      } else {
        fetchContacts();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const data = await searchContacts(term);
      setContacts(data);
    } catch (error) {
      console.error('Error searching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = () => {
    setCurrentContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentContact) {
        await updateContact(currentContact.id, formData);
      } else {
        await addContact(formData);
      }
      setIsModalOpen(false);
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact. ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <button
            onClick={handleAddContact}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
          >
            <FaPlus />
            <span>Add Contact</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        )}
      </main>

      <ContactForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentContact}
      />
    </div>
  );
}

export default App;
