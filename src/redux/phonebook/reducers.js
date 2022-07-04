import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { filterChangeAction } from './actions';
import { fetchContacts, deleteContacts, addContacts } from './selectors';

const filter = createReducer('', {
  [filterChangeAction]: (_, { payload }) => payload,
});

const contacts = createReducer([], {
  [deleteContacts.fulfilled]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
  [addContacts.fulfilled]: (state, { payload }) => [payload, ...state],
  [fetchContacts.fulfilled]: (_, action) => action.payload,
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [deleteContacts.pending]: () => true,
  [deleteContacts.fulfilled]: () => false,
  [deleteContacts.rejected]: () => false,
  [addContacts.pending]: () => true,
  [addContacts.fulfilled]: () => false,
  [addContacts.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: (_, { payload }) => payload,
  [fetchContacts.pending]: () => null,
  [deleteContacts.rejected]: (_, { payload }) => payload,
  [deleteContacts.pending]: () => null,
  [addContacts.rejected]: (_, { payload }) => payload,
  [addContacts.pending]: () => null,
});

export default combineReducers({
  contacts,
  error,
  filter,
  isLoading,
});
