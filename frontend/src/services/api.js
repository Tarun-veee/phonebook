import axios from 'axios';

const API_URL = 'http://localhost:8000/contacts';

const api = axios.create({
    baseURL: API_URL,
});

export const getContacts = async (skip = 0, limit = 100) => {
    const response = await api.get(`/?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const searchContacts = async (name) => {
    const response = await api.get(`/search?name=${name}`);
    return response.data;
};

export const addContact = async (contact) => {
    const response = await api.post('/', contact);
    return response.data;
};

export const updateContact = async (id, contact) => {
    const response = await api.put(`/${id}`, contact);
    return response.data;
};

export const deleteContact = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

export default api;
