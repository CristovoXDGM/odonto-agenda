const clientInitialState = {
  id: null,
  name: '',
};

const clientReducer = (state = clientInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET_CLIENT': {
      return {
        ...state,
        id: null,
        name: '',
      };
    }

    case 'SET_CLIENT': {
      return {
        ...state,
        id: payload.id,
        name: payload.name,
      };
    }
  
    default:
      return state;
  }
}

export default clientReducer;