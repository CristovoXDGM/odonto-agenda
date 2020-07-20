import { combineReducers } from 'redux';

import appointmentsReducer from './apppointments';
import appointmentReducer from './appointment';
import clientsListReducer from './clientsList';
import modalReducer from './modal';

const appReducers = combineReducers({
  appointments: appointmentsReducer,
  appointment: appointmentReducer,
  clients: clientsListReducer,
  modal: modalReducer,
});

export default appReducers;