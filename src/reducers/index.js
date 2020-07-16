import { combineReducers } from 'redux';

import appointmentsReducer from './apppointments';
import appointmentReducer from './appointment';
import modalReducer from './modal';

const appReducers = combineReducers({
  appointments: appointmentsReducer,
  appointment: appointmentReducer,
  modal: modalReducer,
});

export default appReducers;