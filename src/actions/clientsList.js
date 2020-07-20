export const setClients = clients => {
  return {
    type: 'SET_CLIENTS',
    payload: clients,
  }
}

export const searchClients = name => {
  return {
    type: 'SEARCH_CLIENTS',
    payload: name,
  }
}