import { combineReducers } from 'redux';

import appointmentsReducer from './apppointments';
import appointmentReducer from './appointment';
import clientsListReducer from './clientsList';
import clientReducer from './client';
import modalReducer from './modal';

const appReducers = combineReducers({
  appointments: appointmentsReducer,
  appointment: appointmentReducer,
  clients: clientsListReducer,
  client: clientReducer,
  modal: modalReducer,
});

export default appReducers;