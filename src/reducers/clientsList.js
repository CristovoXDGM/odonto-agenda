const clientsListInitialState = {
  clients: [],
  searchedClients: [],
};

const clientsListReducer = (state = clientsListInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CLIENTS':
      return {
        ...state,
        clients: payload,
      };

    case 'SEARCH_CLIENTS': {
      const searchedClients = state.clients.filter(client => {
        const name = client.name.toLowerCase();
        return name.includes(payload);
      });

      return {
        ...state,
        searchedClients,
      };
    }
  
    default:
      return state;
  }
}

export default clientsListReducer;