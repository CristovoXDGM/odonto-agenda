const modalInicialState = {
  modalActive: false,
  modalType: 'new',
};

const modalReducer = (state = modalInicialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ACTIVE': {
      return {
        ...state,
        modalActive: payload,
      };
    }

    case 'SET_TYPE': {
      return {
        ...state,
        modalType: payload,
      }
    }
  
    default:
      return state;
  }
}

export default modalReducer;