import { format } from 'date-fns';

const appointmentInicialState = {
  id: null,
  procedure_id: null,
  client_id: null,
  hour: '',
  duration: '30',
  comments: '',
};

const appointmentReducer = (state = appointmentInicialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET_APPOINTMENT': {
      return {
        ...state,
        id: null,
        procedure_id: null,
        client_id: null,
        hour: '',
        duration: '30',
        comments: '',
      };
    }

    case 'SET_APPOINTMENT': {
      const hour = format(new Date(payload.date), 'HH:mm');

      return {
        ...state,
        id: Number(payload.id),
        procedure_id: payload.procedure_id,
        client_id: payload.client_id,
        hour,
        duration: payload.duration,
        comments: payload.comments,
      }
    }
  
    default:
      return state;
  }
}

export default appointmentReducer;