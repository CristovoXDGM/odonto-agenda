import { combineReducers } from 'redux';
import appointmentsReducer from './apppointments';
import appointmentReducer from './appointment';

const appReducers = combineReducers({
  appointments: appointmentsReducer,
  appointment: appointmentReducer,
});

export default appReducers;