
const appointmentsInicialState = {
  appointments: [],
};

const appointmentsReducer = (state = appointmentsInicialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_APPOINTMENTS':
      return {
        ...state,
        appointments: payload,
      };
  
    default:
      return state;
  }
}

export default appointmentsReducer;