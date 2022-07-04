import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://620a3f5092946600171c58f2.mockapi.io/v1_0';

export const getContacts = state => state.phonebook.contacts;
export const getFilter = state => state.phonebook.filter;

export const getVisibleContacts = state => {
  const contacts = getContacts(state);
  const filter = getFilter(state);
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
};

export const fetchContacts = createAsyncThunk('phonebook/fetchContacts', async () => {
  const { data } = await axios.get('/contacts');
  return data;
});

export const deleteContacts = createAsyncThunk('phonebook/deleteContacts', async id => {
  await axios.delete(`/contacts/${id}`);
  return id;
});

export const addContacts = createAsyncThunk('phonebook/addContacts', async contact => {
  const { data } = await axios.post('/contacts/', contact);
  return data;
});
